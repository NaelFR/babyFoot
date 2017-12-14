import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tournament } from './tournament.model';
import { TournamentService } from './tournament.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tournament',
    templateUrl: './tournament.component.html'
})
export class TournamentComponent implements OnInit, OnDestroy {
tournaments: Tournament[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tournamentService: TournamentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tournamentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tournaments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTournaments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tournament) {
        return item.id;
    }
    registerChangeInTournaments() {
        this.eventSubscriber = this.eventManager.subscribe('tournamentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
