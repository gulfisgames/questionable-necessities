import { Component, HostBinding, Input } from '@angular/core';

import { Card } from '../item-cards.type';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
    @Input() card!: Card;

    @HostBinding('class') get classes() {
        const cardSize = this.card.size.split('x');
        const classes: string[] = [];

        if (cardSize[0] === '1') {
            classes.push('small');
        } else if (cardSize[0] === '2') {
            classes.push('medium');
        } else if (cardSize[0] === '3') {
            classes.push('large');
        } else if (cardSize[0] === '4') {
            classes.push('xlarge');
        }

        if (cardSize[1] === '1') {
            classes.push('single');
        } else if (cardSize[1] === '2') {
            classes.push('double');
        } else if (cardSize[1] === '3') {
            classes.push('triple');
        }

        return classes;
    }
}
