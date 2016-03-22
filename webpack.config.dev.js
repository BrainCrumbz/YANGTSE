var url = require('url');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var common = require('./webpack.common.js');

// ensure development environment
process.env.NODE_ENV = 'development';

var protocol = 'http';
var hostname = 'localhost';

var defaultServerUrl = url.format({
  protocol: protocol,
  hostname: hostname,
  port: common.ports.default,
});

var reloadServerUrl = url.format({
  protocol: protocol,
  hostname: hostname,
  port: common.ports.reload,
});

var config = {

  // Makes sure errors in console map to the correct file and line number
  // Makes sure that breakpoints are hit, and variable values are shown
  // 'cheap-module-eval-source-map' is quicker, but breakpoints don't work
  devtool: 'source-map',
  
  pathinfo: true,
  
  debug: true,
  
  // Set base directory for resolving entry points
  context: common.paths.clientRoot,
  
  entry: {
    
    'vendor': common.paths.vendorEntry,
    
    'main': [

      // For automatic page refresh, inline mode
      'webpack-dev-server/client?' + reloadServerUrl,

      // For hot module replacement
      'webpack/hot/dev-server',

      // Client application main entry point
      common.paths.mainEntry,
      
    ],
    
  },
  
  output: {

    path: common.paths.buildOutput,
    filename: common.files.bundle,
    sourceMapFilename: common.files.sourceMap,
    chunkFilename: common.files.chunk,

    publicPath: common.urls.public,
    
  },
  
  module: {

    preLoaders: [ 
      
      common.preLoaders.tslint, 
    
    ],

    loaders: [
      
      common.loaders.typescript,
      common.loaders.css,
      common.loaders.html,
      
    ],
    
    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,
    
  },
  
  resolve: {
    
    extensions: common.resolvedExtensions,
    
  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),
    
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),
    
    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{ 
      from: common.paths.staticFiles, 
    }]),
    
    // We have to manually add the Hot Replacement plugin when running from Node
    new webpack.HotModuleReplacementPlugin(),
    
  ],
  
  // webpack dev server configuration
  devServer: {

    port: common.ports.reload,

    publicPath: '/',
    
    contentBase: 'buildOutput/',
    
    proxy: {
      // proxied to express backend server
      '/*' : defaultServerUrl,
    },
    
    // Enable Hot Module Replacement
    hot: true,
    inline: true,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    
    // The rest is terminal configurations
    console: true,
    quiet: false,
    noInfo: true,
    stats: { colors: true },
    
  },
  
};

module.exports = config;
