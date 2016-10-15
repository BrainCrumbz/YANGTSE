import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModuleNgFactory } from '../../codegen/src/client/app/app.module.ngfactory';

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\', AOT build...', VERSION, NODE_ENV);

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory)
  .then(_ => console.log('Application successfully bootstrapped.'))
  .catch(err => console.error('Error while bootstrapping application. %s', err));
