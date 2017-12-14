import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PlayOff } from './play-off.model';
import { PlayOffService } from './play-off.service';

@Component({
    selector: 'jhi-play-off-detail',
    templateUrl: './play-off-detail.component.html'
})
export class PlayOffDetailComponent implements OnInit, OnDestroy {

    playOff: PlayOff;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playOffService: PlayOffService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlayOffs();
    }

    load(id) {
        this.playOffService.find(id).subscribe((playOff) => {
            this.playOff = playOff;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayOffs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playOffListModification',
            (response) => this.load(this.playOff.id)
        );
    }
}
