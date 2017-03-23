import { Routes, ExtraOptions } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailComponent } from '../heroes/hero-detail.component';

export const appRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',

}, {
  path: 'dashboard',
  component: DashboardComponent,

}, {
  path: 'heroes',
  component: HeroesComponent,

}, {
  path: 'detail/:id',
  component: HeroDetailComponent,

}];

export const appRoutingOpts: ExtraOptions = {
  useHash: false,
  enableTracing: false,
};
