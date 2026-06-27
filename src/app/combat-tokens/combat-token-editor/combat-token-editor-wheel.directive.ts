import { Directive, HostListener, Input } from '@angular/core';

import { zoomRange } from '../combat-tokens.config';
import { Token } from '../combat-tokens.type';

@Directive({ selector: '[appCombatTokenEditorWheel]' })
export class CombatTokenEditorWheelDirective {
    @Input() appCombatTokenEditorWheel: Token = {} as Token;

    @HostListener('wheel', ['$event'])
    onWheel(wheelEvent: WheelEvent) {
        wheelEvent.preventDefault();
        const speed = Math.ceil(Math.abs(wheelEvent.deltaY) / 40);
        this.appCombatTokenEditorWheel.zoom = Math.max(
            zoomRange.min,
            Math.min(
                zoomRange.max,
                this.appCombatTokenEditorWheel.zoom +
                    speed * Math.sign(wheelEvent.deltaY),
            ),
        );
    }
}
