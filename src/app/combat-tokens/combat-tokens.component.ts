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
import { CombatTokenEditorComponent } from './combat-token-editor/combat-token-editor.component';
import { tokenSets } from './combat-token-sets/combat-token.sets';
import { CombatTokenSetsComponent } from './combat-token-sets/combat-token-sets.component';
import { importLabel, name } from './combat-tokens.config';
import { Token } from './combat-tokens.type';
import { CombatTokensControlsComponent } from './combat-tokens-controls/combat-tokens-controls.component';
import { CombatTokensViewerComponent } from './combat-tokens-viewer/combat-tokens-viewer.component';

@Component({
    selector: 'app-combat-tokens',
    templateUrl: './combat-tokens.component.html',
    styleUrl: './combat-tokens.component.scss',
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonContent,
        JsonImporterComponent,
        IonProgressBar,
        CombatTokenEditorComponent,
        CombatTokenSetsComponent,
        CombatTokensControlsComponent,
        CombatTokensViewerComponent,
        GuideComponent,
        FooterComponent,
    ],
})
export class CombatTokensComponent {
    tokens: Token[] = tokenSets['Mixed'];
    token = { positionX: 0, positionY: 0, ...this.tokens[0] };
    storageKey = 'combat-tokens';

    name = name;
    importLabel = importLabel;

    constructor() {
        const storedTokens = localStorage.getItem(this.storageKey);
        if (storedTokens && storedTokens.length > 2)
            this.tokens = JSON.parse(storedTokens);
    }

    saveToken = (token: Token) =>
        this.setTokens([Object.assign({}, token), ...this.tokens]);

    deleteToken = (token: Token) =>
        this.setTokens(this.tokens.filter((_token) => _token !== token));

    setTokens = (tokens: Token[]) => {
        localStorage.setItem(this.storageKey, JSON.stringify(tokens));
        this.tokens = tokens;
    };

    loadTokenSet = (tokenSetName: string) =>
        this.setTokens(
            tokenSetName ? [...tokenSets[tokenSetName], ...this.tokens] : [],
        );
}
