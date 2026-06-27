import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonRow,
    IonTextarea,
} from '@ionic/angular/standalone';

import { debounceTime } from '../../shared/config';
import { Card, sizes } from '../item-cards.type';

@Component({
    selector: 'app-item-card-editor',
    templateUrl: './item-card-editor.component.html',
    styleUrl: './item-card-editor.component.scss',
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonItem,
        IonInput,
        IonTextarea,
        FormsModule,
    ],
})
export class ItemCardEditorComponent {
    @Input() card!: Card;
    @Output() saveCardEvent = new EventEmitter<Card>();

    debounceTime = debounceTime;

    onClear = () => (this.card = { size: sizes[0] } as Card);

    onSave = () => this.saveCardEvent.emit(this.card);
}
