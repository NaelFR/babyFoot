import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PlayOff } from './play-off.model';
import { PlayOffService } from './play-off.service';

@Injectable()
export class PlayOffPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private playOffService: PlayOffService

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
                this.playOffService.find(id).subscribe((playOff) => {
                    playOff.startDate = this.datePipe
                        .transform(playOff.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    playOff.endDate = this.datePipe
                        .transform(playOff.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.playOffModalRef(component, playOff);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.playOffModalRef(component, new PlayOff());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    playOffModalRef(component: Component, playOff: PlayOff): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.playOff = playOff;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
