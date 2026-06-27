import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    IonAvatar,
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRow,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonToolbar,
} from '@ionic/angular/standalone';

import { name as alignmentTrackerName } from './alignment-tracker/alignment-tracker.config';
import { name as combatTokensName } from './combat-tokens/combat-tokens.config';
import { name as itemCardsName } from './item-cards/item-cards.config';
import { name as rulesName } from './rules/rules.config';
import { name as scenesName } from './scenes/scenes.config';
import { name as soundBoardName } from './sound-board/sound-board.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonMenuToggle,
        IonAvatar,
        IonLabel,
        IonMenu,
        IonHeader,
        IonToolbar,
        IonRow,
        IonCol,
        IonButton,
        IonContent,
        IonList,
        IonItem,
        RouterModule,
    ],
})
export class App {
    paymentLink = 'https://buy.stripe.com/aFa9ATgbyeEj1v4eKBfbq02';

    name = [
        { label: soundBoardName, tab: 'sound-board', xlOnly: false },
        { label: scenesName, tab: 'scenes', xlOnly: false },
        { label: rulesName, tab: 'rules', xlOnly: false },
        { label: alignmentTrackerName, tab: 'alignment-tracker', xlOnly: true },
        { label: itemCardsName, tab: 'item-cards', xlOnly: true },
        { label: combatTokensName, tab: 'combat-tokens', xlOnly: true },
    ];
}
