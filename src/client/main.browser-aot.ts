import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../../codegen/src/client/app/app.module.ngfactory';

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\', AOT build...', VERSION, NODE_ENV);

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
  .then(_ => console.log('Application successfully bootstrapped.'))
  .catch(err => console.error('Error while bootstrapping application. %s', err));
