import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sound-board' },
    {
        path: 'sound-board',
        loadComponent: () =>
            import('./sound-board/sound-board.component').then(
                (m) => m.SoundBoardComponent,
            ),
    },
    {
        path: 'alignment-tracker',
        loadComponent: () =>
            import('./alignment-tracker/alignment-tracker.component').then(
                (m) => m.AlignmentTrackerComponent,
            ),
    },
    {
        path: 'scenes',
        loadComponent: () =>
            import('./scenes/scenes.component').then((m) => m.ScenesComponent),
    },
    {
        path: 'rules',
        loadComponent: () =>
            import('./rules/rules.component').then((m) => m.RulesComponent),
    },
    {
        path: 'item-cards',
        loadComponent: () =>
            import('./item-cards/item-cards.component').then(
                (m) => m.ItemCardsComponent,
            ),
    },
    {
        path: 'combat-tokens',
        loadComponent: () =>
            import('./combat-tokens/combat-tokens.component').then(
                (m) => m.CombatTokensComponent,
            ),
    },

    {
        path: 'privacy',
        loadComponent: () =>
            import('./bulletin/bulletin.component').then(
                (m) => m.BulletinComponent,
            ),
    },
    {
        path: 'terms',
        loadComponent: () =>
            import('./bulletin/bulletin.component').then(
                (m) => m.BulletinComponent,
            ),
    },
    {
        path: 'unknown',
        loadComponent: () =>
            import('./bulletin/bulletin.component').then(
                (m) => m.BulletinComponent,
            ),
    },
    { path: '**', redirectTo: 'unknown' },
];
