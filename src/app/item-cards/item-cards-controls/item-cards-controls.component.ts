import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import {
    IonHeader,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonToolbar,
} from '@ionic/angular/standalone';

import { JsonExporterComponent } from '../../shared/exporter/json-exporter.component';
import { PdfExporterComponent } from '../../shared/exporter/pdf-exporter.component';
import { exportLabel, importLabel } from '../item-cards.config';
import { Card } from '../item-cards.type';

@Component({
    selector: 'app-item-cards-controls',
    templateUrl: './item-cards-controls.component.html',
    imports: [
        IonHeader,
        IonToolbar,
        JsonExporterComponent,
        PdfExporterComponent,
        IonSegment,
        IonSegmentButton,
        IonLabel,
    ],
})
export class ItemCardsControlsComponent {
    @Input() preview = false;
    @Input() cards: Card[] = [];
    @Output() togglePreviewEvent = new EventEmitter<boolean>();

    importLabel = importLabel;
    exportLabel = exportLabel;

    togglePreview = (segmentCustomEvent: SegmentCustomEvent) =>
        this.togglePreviewEvent.emit(!!segmentCustomEvent.detail.value);
}
