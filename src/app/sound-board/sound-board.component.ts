import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import {
    AccordionGroupCustomEvent,
    IonAccordion,
    IonAccordionGroup,
    IonCol,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    IonRow,
    ReorderEndCustomEvent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import debounce from 'lodash.debounce';

import sharedConfig from '../shared/config';
import { JsonExporterComponent } from '../shared/exporter/json-exporter.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { GuideComponent } from '../shared/guide/guide.component';
import { JsonImporterComponent } from '../shared/json-importer/json-importer.component';
import { routeHook } from '../shared/route-hook';
import {
    defaultSound,
    defaultSoundVolume,
    exportLabel,
    importLabel,
    jumpTime,
    name,
    queryParamKey,
} from './sound-board.config';
import soundBoardSeed from './sound-board.seed.json';
import {
    Sound,
    SoundGroup,
    SoundPlaybackEvent,
    SoundTogglePlaybackEvent,
} from './sound-board.type';
import { SoundGroupButtonsComponent } from './sound-group-buttons/sound-group-buttons.component';
import { SoundGroupEditorComponent } from './sound-group-editor/sound-group-editor.component';
import { SoundPlayerComponent } from './sound-player/sound-player.component';

addIcons({ add });

@Component({
    selector: 'app-sound-board',
    templateUrl: './sound-board.component.html',
    imports: [
        IonContent,
        IonList,
        IonRow,
        IonCol,
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonInput,
        IonIcon,
        IonLabel,
        IonReorderGroup,
        IonReorder,
        YouTubePlayer,
        FormsModule,
        SoundGroupButtonsComponent,
        SoundGroupEditorComponent,
        SoundPlayerComponent,
        GuideComponent,
        JsonImporterComponent,
        JsonExporterComponent,
        FooterComponent,
    ],
})
export class SoundBoardComponent implements OnInit {
    private router = inject(Router);

    name = name;

    player!: YT.Player;
    soundGroups: SoundGroup[] = [];
    openSoundGroups: Record<SoundGroup['id'], boolean> = {};
    sound: Sound | null = null;
    storageKey = 'sound-board';
    volumeStorageKey = 'sound-volume';
    importLabel = importLabel;
    exportLabel = exportLabel;
    loading = true;
    error = false;
    isPlaying = false;
    volume = defaultSoundVolume;

    constructor() {
        try {
            const storedSoundBoard = localStorage.getItem(this.storageKey);

            if (storedSoundBoard && storedSoundBoard.length > 2) {
                this.import(JSON.parse(storedSoundBoard));
            } else {
                this.import(Array.from(soundBoardSeed));
            }
        } catch {
            this.import(Array.from(soundBoardSeed));
        }

        try {
            const storedSoundVolume = localStorage.getItem(
                this.volumeStorageKey,
            );

            if (storedSoundVolume) this.volume = parseInt(storedSoundVolume);
        } catch {
            this.volume = defaultSoundVolume;
        }

        routeHook('/sound-board', () => this.initRoute());
    }

    ngOnInit() {
        this.initRoute();
    }

    initRoute = () => {
        const videoId = this.router
            .parseUrl(this.router.url)
            .queryParamMap.get(queryParamKey);

        let sound = this.soundGroups[0].sounds[0];

        if (videoId) {
            const querySound = {
                name: 'Untitled',
                link: `https://youtu.be/${videoId}`,
            };

            sound =
                this.soundGroups
                    .flatMap(({ sounds }) => sounds)
                    .find(({ link }) => link.includes(videoId)) ?? querySound;
        }

        this.setSound(sound);

        // prevent autoplay on initial load
        setTimeout(() => {
            this.playbackEvent(SoundPlaybackEvent.Pause);
            this.playerError(false);
        }, 1000);
    };

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.router.url !== '/sound-board') return;

        if (!(event.target instanceof HTMLInputElement)) {
            if (
                event.code === 'Space' ||
                event.code === 'ArrowRight' ||
                event.code === 'ArrowLeft'
            ) {
                event.preventDefault();
            }

            if (event.code === 'Space') {
                this.togglePlayback({ event, sound: this.sound });
            } else if (event.code === 'ArrowRight') {
                this.playbackEvent(SoundPlaybackEvent.Forward);
            } else if (event.code === 'ArrowLeft') {
                this.playbackEvent(SoundPlaybackEvent.Reverse);
            }
        }
    }

    getVideoId = (url?: string) => {
        const regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url?.match(regExp);

        // pass control to user on error
        if (!match && this.loading) this.playerError(true);

        return match && match[7].length == 11 ? match[7] : '';
    };

    playerReady = (event: YT.PlayerEvent) => {
        this.player = event.target;
        this.volumeEvent(this.volume);
    };

    togglePlayback = (togglePlaybackEvent: SoundTogglePlaybackEvent) => {
        togglePlaybackEvent.event.stopPropagation();

        const isPlaying = this.player.getPlayerState() === 1;
        const isToggleOnly = this.sound === togglePlaybackEvent.sound;
        if (!isToggleOnly && togglePlaybackEvent.sound) {
            this.setSound(togglePlaybackEvent.sound);
        } else {
            if (isPlaying) {
                this.player.pauseVideo();
            } else {
                this.player.playVideo();
            }
        }
    };

    setSound = (sound: Sound) => {
        this.loading = true;
        this.sound = sound;

        this.router.navigate([], {
            queryParams: { [queryParamKey]: this.getVideoId(sound.link) },
            replaceUrl: true,
        });
    };

    addSoundGroup = () => {
        const id = crypto.randomUUID();
        const name = `Sound Group ${this.soundGroups.length + 1}`;
        this.soundGroups.push({
            id,
            name,
            sounds: [{ ...defaultSound }, { ...defaultSound }],
        });
        this.openSoundGroups[id] = true;
        this.save();
    };

    get openSoundGroupIds() {
        return Object.keys(this.openSoundGroups);
    }

    onToggleSoundGroup = (
        event: AccordionGroupCustomEvent<SoundGroup['id'][]>,
    ) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        const soundGroupIds = event.detail.value ?? [];
        this.openSoundGroups = Object.fromEntries(
            soundGroupIds.map((soundGroupId) => [soundGroupId, true]),
        );
    };

    deleteSoundGroup = (soundGroupId: SoundGroup['id']) => {
        this.soundGroups = this.soundGroups.filter(
            ({ id }) => id !== soundGroupId,
        );
        delete this.openSoundGroups[soundGroupId];
        this.save();
    };

    playbackEvent = (soundPlaybackEvent: SoundPlaybackEvent) => {
        if (soundPlaybackEvent === SoundPlaybackEvent.Play) {
            this.player.playVideo();
        } else if (soundPlaybackEvent === SoundPlaybackEvent.Pause) {
            this.player.pauseVideo();
        } else if (soundPlaybackEvent === SoundPlaybackEvent.Forward) {
            this.player.seekTo(this.player.getCurrentTime() + jumpTime, true);
        } else if (soundPlaybackEvent === SoundPlaybackEvent.Reverse) {
            this.player.seekTo(this.player.getCurrentTime() - jumpTime, true);
        }
    };

    debouncePlayerState = debounce((playerState: YT.PlayerState) => {
        this.error = false;
        this.isPlaying = playerState === YT.PlayerState.PLAYING;
        this.loading = false;

        const videoId = this.router
            .parseUrl(this.router.url)
            .queryParamMap.get(queryParamKey);

        this.soundGroups.forEach((soundGroup: SoundGroup) =>
            soundGroup.sounds.forEach((sound: Sound) => {
                const isVideoId = !!videoId && sound.link.includes(videoId);
                const isSound = sound === this.sound;

                sound.play = (isSound || isVideoId) && this.isPlaying;
                sound.loading = false;
            }),
        );
    }, sharedConfig.debounceTime);

    playerError = (error: boolean) => {
        this.error = error;
        this.isPlaying = false;
        this.loading = false;

        this.soundGroups.forEach((soundGroup: SoundGroup) =>
            soundGroup.sounds.forEach((sound: Sound) => {
                sound.loading = false;
                sound.play = false;
            }),
        );
    };

    volumeEvent = (volume: number) => {
        this.volume = volume;
        localStorage.setItem(this.volumeStorageKey, JSON.stringify(volume));

        this.player?.setVolume(volume);
    };

    save = () =>
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(
                this.soundGroups.map(({ id, name, sounds }) => ({
                    id,
                    name,
                    sounds: sounds.map(({ name, link }) => ({ name, link })),
                })),
            ),
        );

    import = (soundGroups: SoundGroup[]) => {
        this.soundGroups = soundGroups;
        this.save();

        this.setSound(this.soundGroups[0].sounds[0]);
    };

    onReorderEnd(event: ReorderEndCustomEvent) {
        const { from, to, complete } = event.detail;

        if (from === to) return complete(false);

        const movedSoundGroup = this.soundGroups.splice(from, 1)[0];
        this.soundGroups.splice(to, 0, movedSoundGroup);
        this.save();

        complete(false);
    }
}
