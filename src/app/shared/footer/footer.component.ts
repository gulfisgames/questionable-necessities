import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    IonButton,
    IonButtons,
    IonFooter,
    IonItem,
    IonNote,
    IonToolbar,
} from '@ionic/angular/standalone';

import packageJson from '../../../../package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [
        IonItem,
        IonNote,
        IonFooter,
        IonToolbar,
        IonButtons,
        IonButton,
        RouterModule,
    ],
})
export class FooterComponent {
    @Input() type: 'page' | 'menu' = 'page';

    year = new Date().getFullYear();
    version = packageJson.version;
    author = packageJson.author;

    get versionLink() {
        return `https://github.com/gulfisgames/questionable-necessities/releases/tag/v${this.version}`;
    }

    get versionText() {
        return `v${this.version} © ${this.year} ${this.author}`;
    }
}
