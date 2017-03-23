import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HeroesModule } from '../heroes/heroes.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppComponent } from '../app/app.component';
import { appRoutes, appRoutingOpts } from '../app/app.routing';
import { appProviders } from '../app/app.providers';

// Here import global styles common to all app modules
import '../shared/common-styles.css';

@NgModule({
  imports: [
    // third-party modules
    BrowserModule,
    FormsModule,
    // this is not currently used in sample, but probably needed in most apps
    HttpModule,

    // custom routing
    RouterModule.forRoot(appRoutes, appRoutingOpts),
    // feature modules
    DashboardModule,
    HeroesModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    appProviders,
  ],
})
export class AppModule {
}
