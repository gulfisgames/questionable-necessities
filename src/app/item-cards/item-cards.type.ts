export interface Card {
    identifier: string;
    name: string;
    attunement?: string;
    type: string;
    rarity?: string;
    description: string;
    size: string;
}

export const sizes = [
    '1x1',
    '2x1',
    '3x1',
    '4x1',
    '2x2',
    '3x2',
    '4x2',
    '3x3',
    '4x3',
];

export default { sizes };
