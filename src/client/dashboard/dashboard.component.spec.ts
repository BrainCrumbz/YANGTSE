import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../heroes/hero.service';

describe('DashboardComponent', () => {

  function buildRouter(): Router {
    const router = jasmine.createSpyObj<Router>('Router', [
      'navigate',
    ]);

    return <Router>router;
  }

  function buildServiceFactory() : HeroService {
    const heroService = jasmine.createSpyObj<HeroService>('HeroService', [
       'getHeroes', 'getHeroesSlowly', 'getHero']);

    return <HeroService>heroService;
  }

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        { provide: Router, useFactory: buildRouter },
        { provide: HeroService, useFactory: buildServiceFactory },
      ],
    });

    TestBed.compileComponents();
  }));

  it('should start with empty heroes', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;

    expect(component.heroes).toEqual([]);
  });

});
