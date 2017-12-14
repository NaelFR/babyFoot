import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { PlayOff } from './play-off.model';
import { PlayOffService } from './play-off.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-play-off',
    templateUrl: './play-off.component.html'
})
export class PlayOffComponent implements OnInit, OnDestroy {
playOffs: PlayOff[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private playOffService: PlayOffService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.playOffService.query().subscribe(
            (res: ResponseWrapper) => {
                this.playOffs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlayOffs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PlayOff) {
        return item.id;
    }
    registerChangeInPlayOffs() {
        this.eventSubscriber = this.eventManager.subscribe('playOffListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
