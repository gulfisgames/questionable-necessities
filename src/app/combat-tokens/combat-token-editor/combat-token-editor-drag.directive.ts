import { Directive, HostListener, Input } from '@angular/core';

import { toPrecision } from '../../shared/utils';
import { getTokenSize } from '../combat-tokens.config';
import { Token } from '../combat-tokens.type';

@Directive({ selector: '[appCombatTokenEditorDrag]' })
export class CombatTokenEditorDragDirective {
    @Input() appCombatTokenEditorDrag: Token = {} as Token;

    private isDragging = false;
    private positionDragStart = { x: 0, y: 0 };
    private positionBeforeDrag = { x: 0, y: 0 };

    @HostListener('mousemove', ['$event'])
    onMouseMove(mouseEvent: MouseEvent) {
        if (!this.isDragging) return;
        mouseEvent.preventDefault();
        const tokenSize = getTokenSize(this.appCombatTokenEditorDrag.size);
        this.appCombatTokenEditorDrag.positionX = toPrecision(
            (mouseEvent.clientX -
                this.positionDragStart.x +
                this.positionBeforeDrag.x) /
                tokenSize,
        );
        this.appCombatTokenEditorDrag.positionY = toPrecision(
            (mouseEvent.clientY -
                this.positionDragStart.y +
                this.positionBeforeDrag.y) /
                tokenSize,
        );
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(mouseEvent: MouseEvent) {
        this.isDragging = true;
        this.positionDragStart.x = mouseEvent.clientX;
        this.positionDragStart.y = mouseEvent.clientY;
    }

    @HostListener('mouseup')
    @HostListener('mouseout')
    onMouseUp() {
        this.isDragging = false;
        const tokenSize = getTokenSize(this.appCombatTokenEditorDrag.size);
        this.positionBeforeDrag.x =
            (this.appCombatTokenEditorDrag.positionX || 0) * tokenSize;
        this.positionBeforeDrag.y =
            (this.appCombatTokenEditorDrag.positionY || 0) * tokenSize;
    }
}
