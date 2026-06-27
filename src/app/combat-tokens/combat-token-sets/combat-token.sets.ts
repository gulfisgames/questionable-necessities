import { Token } from '../combat-tokens.type';
import conjureAnimalsTokens from './conjure-animals.combat-token-set.json';
import demonsTokens from './demons.combat-token-set.json';
import devilsTokens from './devils.combat-token-set.json';
import elementalsTokens from './elementals.combat-token-set.json';
import feyTokens from './fey.combat-token-set.json';
import fiendsTokens from './fiends.combat-token-set.json';
import mixedTokens from './mixed.combat-token-set.json';
import yugolothsTokens from './yugoloths.combat-token-set.json';

export const tokenSets: { [key: string]: Token[] } = {
    Fey: Array.from(feyTokens),
    Elementals: Array.from(elementalsTokens),
    Devils: Array.from(devilsTokens),
    Demons: Array.from(demonsTokens),
    Yugoloths: Array.from(yugolothsTokens),
    Fiends: Array.from(fiendsTokens),
    'Conjure Animals': Array.from(conjureAnimalsTokens),
    Mixed: Array.from(mixedTokens),
};

export default tokenSets;
