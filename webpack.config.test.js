var webpack = require('webpack');
var common = require('./webpack.common.js');

// ensure test environment
process.env.NODE_ENV = 'test';

var config = {

  devtool: 'inline-source-map',

  // no need to specify entry points: this configuration is used to run webpack
  // by karma, that is responsible for submitting test files as entry points
  entry: {},

  // for same reason, no need to specify outputs, those are managed by karma as well
  output: {},

  stats: {
    colors: true,
    reasons: true,
  },

  cache: false,

  // TODO consider applying some null loaders for CSS in test
  // (see https://angular.io/docs/ts/latest/guide/webpack.html)

  module: {

    loaders: [

      // Pre-loaders
      common.rules.tslint,
      common.rules.javascriptTest,

      // Loaders
      common.rules.typescriptTest,
      common.rules.componentSass,
      common.rules.componentCss,
      common.rules.globalCss,
      common.rules.html,

      // Post-loaders
      // TODO enable when it is not scrambling source maps
      //common.rules.istanbul,

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  resolve: {

    cache: false,

    extensions: common.resolve.extensions,
    modules: common.resolve.modules,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    // Until loaders are updated, use the LoaderOptionsPlugin to pass custom properties to third-party loaders
    new webpack.LoaderOptionsPlugin({

      // Put loaders into debug mode
      // Note: this will be deprecated in v3 or later. Remove when loaders will update.
      debug: false,

      options: {

        postcss: common.postcss,

      },
    }),

    // Provides context to Angular's use of System.import
    // See https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      common.patterns.angularContext,
      common.absPaths.clientSrc
    ),

  ],

};

module.exports = config;
