/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BabyFootManagerTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PlayOffDetailComponent } from '../../../../../../main/webapp/app/entities/play-off/play-off-detail.component';
import { PlayOffService } from '../../../../../../main/webapp/app/entities/play-off/play-off.service';
import { PlayOff } from '../../../../../../main/webapp/app/entities/play-off/play-off.model';

describe('Component Tests', () => {

    describe('PlayOff Management Detail Component', () => {
        let comp: PlayOffDetailComponent;
        let fixture: ComponentFixture<PlayOffDetailComponent>;
        let service: PlayOffService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BabyFootManagerTestModule],
                declarations: [PlayOffDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PlayOffService,
                    JhiEventManager
                ]
            }).overrideTemplate(PlayOffDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayOffDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayOffService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PlayOff(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.playOff).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
