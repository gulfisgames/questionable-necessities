import { Component, Input } from '@angular/core';
import {
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { downloadOutline } from 'ionicons/icons';
import { jsPDF } from 'jspdf';

import { getExportName } from './utils';

addIcons({ downloadOutline });

@Component({
    selector: 'app-pdf-exporter',
    templateUrl: './exporter.component.html',
    imports: [IonButton, IonIcon, IonLabel, IonItem],
})
export class PdfExporterComponent {
    @Input() label = 'Export PDF';
    @Input() sheetSelector = '.sheet';
    @Input() variant: 'button' | 'item' = 'button';

    export = async () => {
        const htmlElements = Array.from<HTMLElement>(
            document.querySelectorAll(this.sheetSelector),
        ).reverse();

        const doc = new jsPDF({ orientation: 'landscape' });

        for (let i = 0; i < htmlElements.length; i++) {
            await doc.html(htmlElements[i], {
                callback: (doc) =>
                    i + 1 < htmlElements.length ? doc.insertPage(1) : doc,
                width: 297,
                windowWidth: 1122.52,
            });
        }

        doc.save(getExportName(this.label, 'pdf'));
    };
}
