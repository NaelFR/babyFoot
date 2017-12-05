import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BabyFootManagerSharedModule } from '../../shared';
import {
    PlayOffService,
    PlayOffPopupService,
    PlayOffComponent,
    PlayOffDetailComponent,
    PlayOffDialogComponent,
    PlayOffPopupComponent,
    PlayOffDeletePopupComponent,
    PlayOffDeleteDialogComponent,
    playOffRoute,
    playOffPopupRoute,
} from './';

const ENTITY_STATES = [
    ...playOffRoute,
    ...playOffPopupRoute,
];

@NgModule({
    imports: [
        BabyFootManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlayOffComponent,
        PlayOffDetailComponent,
        PlayOffDialogComponent,
        PlayOffDeleteDialogComponent,
        PlayOffPopupComponent,
        PlayOffDeletePopupComponent,
    ],
    entryComponents: [
        PlayOffComponent,
        PlayOffDialogComponent,
        PlayOffPopupComponent,
        PlayOffDeleteDialogComponent,
        PlayOffDeletePopupComponent,
    ],
    providers: [
        PlayOffService,
        PlayOffPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BabyFootManagerPlayOffModule {}
