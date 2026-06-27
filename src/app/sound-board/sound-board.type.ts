export interface SoundGroup {
    id: string;
    name: string;
    sounds: Sound[];
}

export interface Sound {
    name: string;
    link: string;
    play?: boolean;
    loading?: boolean;
}

export interface SoundTogglePlaybackEvent {
    event: Event;
    sound: Sound | null;
}

export enum SoundPlaybackEvent {
    Play,
    Pause,
    Forward,
    Reverse,
}
