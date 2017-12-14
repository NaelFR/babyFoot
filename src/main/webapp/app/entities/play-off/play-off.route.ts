import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PlayOffComponent } from './play-off.component';
import { PlayOffDetailComponent } from './play-off-detail.component';
import { PlayOffPopupComponent } from './play-off-dialog.component';
import { PlayOffDeletePopupComponent } from './play-off-delete-dialog.component';

export const playOffRoute: Routes = [
    {
        path: 'play-off',
        component: PlayOffComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'babyFootManagerApp.playOff.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'play-off/:id',
        component: PlayOffDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'babyFootManagerApp.playOff.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playOffPopupRoute: Routes = [
    {
        path: 'play-off-new',
        component: PlayOffPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'babyFootManagerApp.playOff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'play-off/:id/edit',
        component: PlayOffPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'babyFootManagerApp.playOff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'play-off/:id/delete',
        component: PlayOffDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'babyFootManagerApp.playOff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
