/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BabyFootManagerTestModule } from '../../../test.module';
import { TeamDialogComponent } from '../../../../../../main/webapp/app/entities/team/team-dialog.component';
import { TeamService } from '../../../../../../main/webapp/app/entities/team/team.service';
import { Team } from '../../../../../../main/webapp/app/entities/team/team.model';
import { TournamentService } from '../../../../../../main/webapp/app/entities/tournament';
import { PlayOffService } from '../../../../../../main/webapp/app/entities/play-off';

describe('Component Tests', () => {

    describe('Team Management Dialog Component', () => {
        let comp: TeamDialogComponent;
        let fixture: ComponentFixture<TeamDialogComponent>;
        let service: TeamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BabyFootManagerTestModule],
                declarations: [TeamDialogComponent],
                providers: [
                    TournamentService,
                    PlayOffService,
                    TeamService
                ]
            })
            .overrideTemplate(TeamDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeamDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Team(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.team = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Team();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.team = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
