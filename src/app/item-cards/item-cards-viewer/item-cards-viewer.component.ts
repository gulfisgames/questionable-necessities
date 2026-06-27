import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemCardsService } from '../item-cards.service';
import { Card } from '../item-cards.type';

@Component({
    selector: 'app-item-cards-viewer',
    templateUrl: './item-cards-viewer.component.html',
    styleUrls: [
        '../../shared/paper-css.component.scss',
        './item-cards-viewer.component.scss',
    ],
    providers: [ItemCardsService],
    imports: [IonContent, ItemCardComponent],
})
export class ItemCardsViewerComponent implements OnChanges {
    private itemCardsService = inject(ItemCardsService);

    @Input() cards: Card[] = [];
    @Output() loadCardEvent = new EventEmitter<Card>();

    sheets: Card[][] = [];

    ngOnChanges(changes: SimpleChanges) {
        if ('cards' in changes) this.loadSheets();
    }

    loadSheets = () =>
        (this.sheets = this.itemCardsService.getSheets([...this.cards]));

    loadCard = (card: Card) => this.loadCardEvent.emit(card);
}
