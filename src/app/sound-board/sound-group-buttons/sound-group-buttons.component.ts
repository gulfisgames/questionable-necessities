import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    IonButton,
    IonIcon,
    IonLabel,
    IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pauseOutline, playOutline } from 'ionicons/icons';

import { colours } from '../sound-board.config';
import {
    Sound,
    SoundGroup,
    SoundTogglePlaybackEvent,
} from '../sound-board.type';

addIcons({ pauseOutline, playOutline });

@Component({
    selector: 'app-sound-group-buttons',
    templateUrl: './sound-group-buttons.component.html',
    styleUrl: './sound-group-buttons.component.scss',
    imports: [IonButton, IonIcon, IonSpinner, IonLabel],
})
export class SoundGroupButtonsComponent {
    @Input() soundGroup!: SoundGroup;
    @Input() disabled = true;
    @Output() togglePlaybackEvent =
        new EventEmitter<SoundTogglePlaybackEvent>();

    colours = colours;

    isValidUrl = (url: string) =>
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);

    togglePlayback = (event: Event, sound: Sound) => {
        sound.loading = true;
        this.togglePlaybackEvent.emit({ event, sound });
    };
}
