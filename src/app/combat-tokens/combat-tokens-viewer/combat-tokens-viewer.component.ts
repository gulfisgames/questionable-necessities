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

import { scaleTokenPosition } from '../combat-tokens.config';
import { CombatTokensService } from '../combat-tokens.service';
import { Token } from '../combat-tokens.type';

@Component({
    selector: 'app-combat-tokens-viewer',
    templateUrl: './combat-tokens-viewer.component.html',
    styleUrls: [
        '../../shared/paper-css.component.scss',
        '../combat-token.component.scss',
        './combat-tokens-viewer.component.scss',
    ],
    providers: [CombatTokensService],
    imports: [IonContent],
})
export class CombatTokensViewerComponent implements OnChanges {
    private combatTokensService = inject(CombatTokensService);

    @Input() tokens: Token[] = [];
    @Output() deleteTokenEvent = new EventEmitter<Token>();

    sheets: Token[][] = [];
    scaleTokenPosition = scaleTokenPosition;

    ngOnChanges(changes: SimpleChanges) {
        if ('tokens' in changes) this.loadSheets();
    }

    loadSheets = () =>
        (this.sheets = this.combatTokensService.getSheets([...this.tokens]));

    deleteToken = (token: Token) => this.deleteTokenEvent.emit(token);
}
