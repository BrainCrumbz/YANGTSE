// Angular 2 polyfills

//import 'ie-shim';  // Internet Explorer
import 'core-js/es6';
import 'core-js/es7/reflect';

// Angular 2 libs
import 'zone.js/dist/zone.min';

// Angular 2
// When doing AOT build, do *NOT* import any Angular 2 module here. Let compiler pick needed modules

// RxJS
// avoid importing the whole RxJS library here. Although more tedious, look for all
// "import 'rxjs/xxx';" occurences in your source code, and collect them here as well

if (NODE_ENV === 'development') {
  // activate long strack traces, only in development
  /*
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  */
}
