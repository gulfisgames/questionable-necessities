import { Component } from '@angular/core';
import {
    IonCol,
    IonContent,
    IonGrid,
    IonProgressBar,
    IonRow,
} from '@ionic/angular/standalone';

import { FooterComponent } from '../shared/footer/footer.component';
import { GuideComponent } from '../shared/guide/guide.component';
import { JsonImporterComponent } from '../shared/json-importer/json-importer.component';
import { ItemCardEditorComponent } from './item-card-editor/item-card-editor.component';
import { cardSets } from './item-card-sets/item-card.sets';
import { ItemCardSetsComponent } from './item-card-sets/item-card-sets.component';
import { importLabel, name } from './item-cards.config';
import { Card, sizes } from './item-cards.type';
import { ItemCardsControlsComponent } from './item-cards-controls/item-cards-controls.component';
import { ItemCardsTableComponent } from './item-cards-table/item-cards-table.component';
import { ItemCardsViewerComponent } from './item-cards-viewer/item-cards-viewer.component';

@Component({
    selector: 'app-item-cards',
    templateUrl: './item-cards.component.html',
    styleUrl: './item-cards.component.scss',
    imports: [
        IonContent,
        IonGrid,
        GuideComponent,
        IonRow,
        IonCol,
        JsonImporterComponent,
        IonProgressBar,
        ItemCardEditorComponent,
        ItemCardSetsComponent,
        ItemCardsControlsComponent,
        ItemCardsTableComponent,
        ItemCardsViewerComponent,
        FooterComponent,
    ],
})
export class ItemCardsComponent {
    cards: Card[] = cardSets['Starter'];
    card = { size: sizes[0] } as Card;
    preview = false;
    storageKey = 'item-cards';

    name = name;
    importLabel = importLabel;

    constructor() {
        const storedCards = localStorage.getItem(this.storageKey);
        if (storedCards && storedCards.length > 2)
            this.cards = JSON.parse(storedCards);
    }

    togglePreview = (preview: boolean) => (this.preview = preview);

    saveCard = (card: Card) =>
        this.setCards([Object.assign({}, card), ...this.cards]);

    loadCard = (card: Card) => (this.card = Object.assign({}, card));

    deleteCard = (card: Card) =>
        this.setCards(this.cards.filter((_card) => _card !== card));

    setCards = (cards: Card[]) => {
        localStorage.setItem(this.storageKey, JSON.stringify(cards));
        this.cards = cards;
    };

    loadCardSet = (cardSetName: string) =>
        this.setCards(
            cardSetName ? [...cardSets[cardSetName], ...this.cards] : [],
        );
}
