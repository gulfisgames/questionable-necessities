export abstract class SheetService<T> {
    abstract rows: number;
    abstract columns: number;

    abstract getSize(entity: T): string;

    getEntitySize = (entity: T): number[] =>
        this.getSize(entity)
            .split('x')
            .map((size) => parseInt(size));

    findEntity = (entities: T[], x: number, y: number) =>
        entities.findIndex((entity) => {
            const entitySize = this.getEntitySize(entity);
            return entitySize[0] <= x && entitySize[1] <= y;
        });

    fillSheet = (sheet: T[], entities: T[], x: number, y: number) => {
        const entityIndex = this.findEntity(entities, x, y);

        if (entityIndex >= 0) {
            const entity = entities.splice(entityIndex, 1)[0];
            sheet.push(entity);
            const entitySize = this.getEntitySize(entity);

            let sheetAX = x - entitySize[0];
            let sheetAY = entitySize[1];
            let sheetBX = x;
            let sheetBY = y - entitySize[1];
            if (this.columns > this.rows) {
                sheetAX = entitySize[0];
                sheetAY = y - entitySize[1];
                sheetBX = x - entitySize[0];
                sheetBY = y;
            }

            this.fillSheet(sheet, entities, sheetAX, sheetAY);
            this.fillSheet(sheet, entities, sheetBX, sheetBY);
        }

        return [sheet, entities];
    };

    getSheets = (entities: T[]) => {
        entities.sort(this.sortEntities);
        const sheets: T[][] = [];
        let entityIndex = this.findEntity(entities, this.rows, this.columns);

        while (entityIndex >= 0) {
            const [sheet, entitiesLeft] = this.fillSheet(
                [],
                entities,
                this.rows,
                this.columns,
            );
            entities = [...entitiesLeft];
            entityIndex = this.findEntity(entities, this.rows, this.columns);
            sheets.push(sheet);
        }

        return sheets;
    };

    sortEntities = (entityA: T, entityB: T) => {
        const entityASize = this.getEntitySize(entityA);
        const entityBSize = this.getEntitySize(entityB);
        const columnSizeDiff = entityBSize[1] - entityASize[1];
        const rowSizeDiff = entityBSize[0] - entityASize[0];
        return columnSizeDiff === 0 ? rowSizeDiff : columnSizeDiff;
    };
}
