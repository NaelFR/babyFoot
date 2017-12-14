import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayOff } from './play-off.model';
import { PlayOffPopupService } from './play-off-popup.service';
import { PlayOffService } from './play-off.service';

@Component({
    selector: 'jhi-play-off-delete-dialog',
    templateUrl: './play-off-delete-dialog.component.html'
})
export class PlayOffDeleteDialogComponent {

    playOff: PlayOff;

    constructor(
        private playOffService: PlayOffService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playOffService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playOffListModification',
                content: 'Deleted an playOff'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-play-off-delete-popup',
    template: ''
})
export class PlayOffDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playOffPopupService: PlayOffPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.playOffPopupService
                .open(PlayOffDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
