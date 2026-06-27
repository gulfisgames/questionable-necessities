import { SheetService } from '../shared/sheet.service';
import { sizes } from './combat-tokens.config';
import { Token } from './combat-tokens.type';

export class CombatTokensService extends SheetService<Token> {
    rows = 16;
    columns = 22;

    getSize = (token: Token) => sizes[token.size as keyof typeof sizes];
}
