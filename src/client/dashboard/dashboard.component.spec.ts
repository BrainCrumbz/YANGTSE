import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../heroes/hero.service';

describe('DashboardComponent', () => {

  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async(() => {

    const router = jasmine.createSpyObj<Router>('Router', [
      'navigate',
    ]);

    const heroService = jasmine.createSpyObj<HeroService>('HeroService', [
       'getHeroes', 'getHeroesSlowly', 'getHero']);

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: HeroService, useValue: heroService },
      ],
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
    });

  }));

  it('should start with empty heroes', () => {
    expect(component.heroes).toEqual([]);
  });

});
