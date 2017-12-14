/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BabyFootManagerTestModule } from '../../../test.module';
import { PlayOffComponent } from '../../../../../../main/webapp/app/entities/play-off/play-off.component';
import { PlayOffService } from '../../../../../../main/webapp/app/entities/play-off/play-off.service';
import { PlayOff } from '../../../../../../main/webapp/app/entities/play-off/play-off.model';

describe('Component Tests', () => {

    describe('PlayOff Management Component', () => {
        let comp: PlayOffComponent;
        let fixture: ComponentFixture<PlayOffComponent>;
        let service: PlayOffService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BabyFootManagerTestModule],
                declarations: [PlayOffComponent],
                providers: [
                    PlayOffService
                ]
            })
            .overrideTemplate(PlayOffComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayOffComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayOffService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PlayOff(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.playOffs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
