/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BabyFootManagerTestModule } from '../../../test.module';
import { GameDetailComponent } from '../../../../../../main/webapp/app/entities/game/game-detail.component';
import { GameService } from '../../../../../../main/webapp/app/entities/game/game.service';
import { Game } from '../../../../../../main/webapp/app/entities/game/game.model';

describe('Component Tests', () => {

    describe('Game Management Detail Component', () => {
        let comp: GameDetailComponent;
        let fixture: ComponentFixture<GameDetailComponent>;
        let service: GameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BabyFootManagerTestModule],
                declarations: [GameDetailComponent],
                providers: [
                    GameService
                ]
            })
            .overrideTemplate(GameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Game(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.game).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
