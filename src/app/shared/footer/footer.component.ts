import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    IonButton,
    IonButtons,
    IonFooter,
    IonToolbar,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [IonFooter, IonToolbar, IonButtons, IonButton, RouterModule],
})
export class FooterComponent {
    year = new Date().getFullYear();
}
