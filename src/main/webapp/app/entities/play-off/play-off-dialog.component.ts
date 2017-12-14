import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayOff } from './play-off.model';
import { PlayOffPopupService } from './play-off-popup.service';
import { PlayOffService } from './play-off.service';
import { Team, TeamService } from '../team';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-play-off-dialog',
    templateUrl: './play-off-dialog.component.html'
})
export class PlayOffDialogComponent implements OnInit {

    playOff: PlayOff;
    isSaving: boolean;

    teams: Team[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private playOffService: PlayOffService,
        private teamService: TeamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teamService.query()
            .subscribe((res: ResponseWrapper) => { this.teams = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.playOff.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playOffService.update(this.playOff));
        } else {
            this.subscribeToSaveResponse(
                this.playOffService.create(this.playOff));
        }
    }

    private subscribeToSaveResponse(result: Observable<PlayOff>) {
        result.subscribe((res: PlayOff) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PlayOff) {
        this.eventManager.broadcast({ name: 'playOffListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeamById(index: number, item: Team) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-play-off-popup',
    template: ''
})
export class PlayOffPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playOffPopupService: PlayOffPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playOffPopupService
                    .open(PlayOffDialogComponent as Component, params['id']);
            } else {
                this.playOffPopupService
                    .open(PlayOffDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
