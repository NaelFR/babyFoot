import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Player } from './player.model';
import { PlayerPopupService } from './player-popup.service';
import { PlayerService } from './player.service';
import { Team, TeamService } from '../team';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-player-dialog',
    templateUrl: './player-dialog.component.html'
})
export class PlayerDialogComponent implements OnInit {

    player: Player;
    isSaving: boolean;

    teams: Team[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private playerService: PlayerService,
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
        if (this.player.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playerService.update(this.player));
        } else {
            this.subscribeToSaveResponse(
                this.playerService.create(this.player));
        }
    }

    private subscribeToSaveResponse(result: Observable<Player>) {
        result.subscribe((res: Player) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Player) {
        this.eventManager.broadcast({ name: 'playerListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-player-popup',
    template: ''
})
export class PlayerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playerPopupService: PlayerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playerPopupService
                    .open(PlayerDialogComponent as Component, params['id']);
            } else {
                this.playerPopupService
                    .open(PlayerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
