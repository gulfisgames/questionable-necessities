export const name = 'Sound Board';
export const queryParamKey = 'v';

export const soundGroupSize = 6;

export const jumpTime = 15;

export const colours = [
    'secondary',
    'tertiary',
    'success',
    'dark',
    'medium',
    'danger',
];

export const importLabel = `Import ${name} JSON`;
export const exportLabel = `Export ${name} JSON`;

export const playerUpdateInterval = 100;

export const defaultSound = {
    name: 'Why is you so mean to me',
    link: 'https://youtu.be/cM6hnp3iB5U',
};

export const defaultSoundVolume = 80;

export default {
    name,
    queryParamKey,
    soundGroupSize,
    jumpTime,
    colours,
    importLabel,
    exportLabel,
    playerUpdateInterval,
    defaultSound,
};
