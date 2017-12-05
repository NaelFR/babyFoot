import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BabyFootManagerTournamentModule } from './tournament/tournament.module';
import { BabyFootManagerPlayOffModule } from './play-off/play-off.module';
import { BabyFootManagerGameModule } from './game/game.module';
import { BabyFootManagerTeamModule } from './team/team.module';
import { BabyFootManagerPlayerModule } from './player/player.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BabyFootManagerTournamentModule,
        BabyFootManagerPlayOffModule,
        BabyFootManagerGameModule,
        BabyFootManagerTeamModule,
        BabyFootManagerPlayerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BabyFootManagerEntityModule {}
