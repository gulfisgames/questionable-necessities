import { SheetService } from '../shared/sheet.service';
import { Card } from './item-cards.type';

export class ItemCardsService extends SheetService<Card> {
    rows = 4;
    columns = 3;

    getSize = (card: Card) => card.size;
}
