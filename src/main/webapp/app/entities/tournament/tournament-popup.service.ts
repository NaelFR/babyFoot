import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tournament } from './tournament.model';
import { TournamentService } from './tournament.service';

@Injectable()
export class TournamentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tournamentService: TournamentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tournamentService.find(id).subscribe((tournament) => {
                    tournament.startDate = this.datePipe
                        .transform(tournament.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    tournament.endDate = this.datePipe
                        .transform(tournament.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tournamentModalRef(component, tournament);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tournamentModalRef(component, new Tournament());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tournamentModalRef(component: Component, tournament: Tournament): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tournament = tournament;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
