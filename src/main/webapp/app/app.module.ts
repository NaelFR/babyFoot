import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BabyFootManagerSharedModule, UserRouteAccessService } from './shared';
import { BabyFootManagerAppRoutingModule} from './app-routing.module';
import { BabyFootManagerHomeModule } from './home/home.module';
import { BabyFootManagerAdminModule } from './admin/admin.module';
import { BabyFootManagerAccountModule } from './account/account.module';
import { BabyFootManagerEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BabyFootManagerAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BabyFootManagerSharedModule,
        BabyFootManagerHomeModule,
        BabyFootManagerAdminModule,
        BabyFootManagerAccountModule,
        BabyFootManagerEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BabyFootManagerAppModule {}
