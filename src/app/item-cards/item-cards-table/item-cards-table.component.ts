import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectCustomEvent } from '@ionic/angular';
import {
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonText,
} from '@ionic/angular/standalone';

import { importLabel, name } from '../item-cards.config';
import { Card, sizes } from '../item-cards.type';

@Component({
    selector: 'app-item-cards-table',
    templateUrl: './item-cards-table.component.html',
    styleUrl: './item-cards-table.component.scss',
    imports: [
        IonList,
        IonNote,
        IonText,
        IonItemSliding,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonItemOptions,
        IonItemOption,
    ],
})
export class ItemCardsTableComponent {
    @Input() cards: Card[] = [];
    @Output() deleteCardEvent = new EventEmitter<Card>();
    @Output() loadCardEvent = new EventEmitter<Card>();

    name = name;
    importLabel = importLabel;

    sizes = sizes;

    setCardSize = (card: Card, selectCustomEvent: SelectCustomEvent) =>
        (card.size = selectCustomEvent.detail.value);

    deleteCard = (card: Card) => this.deleteCardEvent.emit(card);

    loadCard = (card: Card) => this.loadCardEvent.emit(card);
}
