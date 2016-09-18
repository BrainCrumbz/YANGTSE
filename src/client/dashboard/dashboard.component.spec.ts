// TODO: not working yet
/*
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from '@angular/router-deprecated';
import { RootRouter } from '@angular/router-deprecated/src/router';
import { SpyLocation } from '@angular/common/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/hero';

describe('DashboardComponent', () => {

  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let heroService: HeroService;

  function mockServiceFactory() : HeroService {
    heroService = jasmine.createSpyObj<HeroService>('HeroService', [
       'getHeroes', 'getHeroesSlowly', 'getHero']);

    return <HeroService>heroService;
  }

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(DashboardComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });


  beforeEach(() => [
    DashboardComponent,
    provide(HeroService, {useFactory: mockServiceFactory}),
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: DashboardComponent}),
    provide(Router, {useClass: RootRouter})
  ]);

  it('true is true', () => expect(true).toBe(true));

  it('should have empty heroes', inject([ DashboardComponent ], (dashboard: DashboardComponent) => {
    expect(dashboard.heroes).toEqual([]);
  }));

});

*/
