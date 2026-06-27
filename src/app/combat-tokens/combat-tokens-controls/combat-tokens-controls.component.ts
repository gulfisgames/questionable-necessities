import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';

import { HtmlExporterComponent } from '../../shared/exporter/html-exporter.component';
import { JsonExporterComponent } from '../../shared/exporter/json-exporter.component';
import { exportLabel } from '../combat-tokens.config';
import { Token } from '../combat-tokens.type';

@Component({
    selector: 'app-combat-tokens-controls',
    templateUrl: './combat-tokens-controls.component.html',
    imports: [
        IonHeader,
        IonToolbar,
        JsonExporterComponent,
        HtmlExporterComponent,
    ],
})
export class CombatTokensControlsComponent {
    @Input() tokens: Token[] = [];

    exportLabel = exportLabel;
}
