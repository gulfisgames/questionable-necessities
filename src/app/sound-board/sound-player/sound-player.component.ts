import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonIcon,
    IonLabel,
    IonProgressBar,
    IonRange,
    IonSpinner,
    IonToolbar,
    RangeCustomEvent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    pause,
    play,
    playBackOutline,
    playForwardOutline,
    volumeHighOutline,
    volumeLowOutline,
} from 'ionicons/icons';

import { playerUpdateInterval } from '../sound-board.config';
import { Sound, SoundPlaybackEvent } from '../sound-board.type';

addIcons({
    playBackOutline,
    pause,
    play,
    playForwardOutline,
    volumeHighOutline,
    volumeLowOutline,
});

@Component({
    selector: 'app-sound-player',
    templateUrl: './sound-player.component.html',
    styleUrl: './sound-player.component.scss',
    imports: [
        IonToolbar,
        IonLabel,
        IonButtons,
        IonButton,
        IonIcon,
        IonSpinner,
        IonRange,
        IonProgressBar,
    ],
})
export class SoundPlayerComponent implements OnInit {
    @Input() sound: Sound | null = null;
    @Input() player!: YT.Player;
    @Input() loading = true;
    @Input() error = false;
    @Input() isPlaying = false;
    @Output() playbackEvent = new EventEmitter<SoundPlaybackEvent>();
    @Output() volumeEvent = new EventEmitter<number>();

    playbackTime = 0;
    bufferedTime = 0;

    soundPlaybackEvent = SoundPlaybackEvent;

    ngOnInit() {
        setInterval(this.updatePlayerTime, playerUpdateInterval);
    }

    playback = (soundPlaybackEvent: SoundPlaybackEvent) =>
        this.playbackEvent.emit(soundPlaybackEvent);

    setVolume = (rangeCustomEvent: RangeCustomEvent) =>
        this.volumeEvent.emit(Number(rangeCustomEvent.detail.value));

    seekVideo(event: MouseEvent) {
        const progress =
            event.offsetX / (event.target as HTMLElement).clientWidth;
        const time = progress * this.player.getDuration();
        this.player.seekTo(time, true);
    }

    updatePlayerTime = () => {
        if (this.player) {
            this.playbackTime =
                this.player.getCurrentTime() / this.player.getDuration();
            this.bufferedTime = this.player.getVideoLoadedFraction();
        }
    };
}
