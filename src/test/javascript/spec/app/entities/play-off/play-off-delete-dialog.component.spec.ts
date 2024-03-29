/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BabyFootManagerTestModule } from '../../../test.module';
import { PlayOffDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/play-off/play-off-delete-dialog.component';
import { PlayOffService } from '../../../../../../main/webapp/app/entities/play-off/play-off.service';

describe('Component Tests', () => {

    describe('PlayOff Management Delete Component', () => {
        let comp: PlayOffDeleteDialogComponent;
        let fixture: ComponentFixture<PlayOffDeleteDialogComponent>;
        let service: PlayOffService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BabyFootManagerTestModule],
                declarations: [PlayOffDeleteDialogComponent],
                providers: [
                    PlayOffService
                ]
            })
            .overrideTemplate(PlayOffDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayOffDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayOffService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
