import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BabyFootManagerSharedModule } from '../../shared';
import {
    TournamentService,
    TournamentPopupService,
    TournamentComponent,
    TournamentDetailComponent,
    TournamentDialogComponent,
    TournamentPopupComponent,
    TournamentDeletePopupComponent,
    TournamentDeleteDialogComponent,
    tournamentRoute,
    tournamentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tournamentRoute,
    ...tournamentPopupRoute,
];

@NgModule({
    imports: [
        BabyFootManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TournamentComponent,
        TournamentDetailComponent,
        TournamentDialogComponent,
        TournamentDeleteDialogComponent,
        TournamentPopupComponent,
        TournamentDeletePopupComponent,
    ],
    entryComponents: [
        TournamentComponent,
        TournamentDialogComponent,
        TournamentPopupComponent,
        TournamentDeleteDialogComponent,
        TournamentDeletePopupComponent,
    ],
    providers: [
        TournamentService,
        TournamentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BabyFootManagerTournamentModule {}
