// Angular 2 polyfills

//import 'ie-shim';  // Internet Explorer
import 'core-js/es6';
import 'core-js/es7/reflect';

// Angular 2 libs
import 'zone.js/dist/zone.min';

// Angular 2
// import Angular 2 here, so to have it as common dependencies in vendor bundle
import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';

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
