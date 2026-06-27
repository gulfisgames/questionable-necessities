import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonLabel,
    IonRange,
    IonRow,
    IonSelect,
    IonSelectOption,
} from '@ionic/angular/standalone';

import { debounceTime } from '../../shared/config';
import {
    colours,
    scaleTokenPosition,
    sizes,
    zoomRange,
} from '../combat-tokens.config';
import { Token } from '../combat-tokens.type';
import { CombatTokenEditorDragDirective } from './combat-token-editor-drag.directive';
import { CombatTokenEditorWheelDirective } from './combat-token-editor-wheel.directive';

@Component({
    selector: 'app-combat-token-editor',
    templateUrl: './combat-token-editor.component.html',
    styleUrls: [
        '../combat-token.component.scss',
        './combat-token-editor.component.scss',
    ],
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonSelect,
        IonSelectOption,
        IonLabel,
        IonRange,
        CombatTokenEditorWheelDirective,
        CombatTokenEditorDragDirective,
        KeyValuePipe,
        FormsModule,
    ],
})
export class CombatTokenEditorComponent {
    @Input() token: Token = {} as Token;
    @Output() saveTokenEvent = new EventEmitter<Token>();

    debounceTime = debounceTime;
    sizes = sizes;
    zoomRange = zoomRange;
    scaleTokenPosition = scaleTokenPosition;

    onSave = () => this.saveTokenEvent.emit(this.token);

    onSaveBatch = () =>
        colours.forEach((colour) =>
            this.saveTokenEvent.emit(Object.assign({}, this.token, { colour })),
        );
}
