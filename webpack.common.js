var path = require('path');
var autoprefixer = require('autoprefixer');

var ports = {
  // local dev server port
  default: 8081,
  // local hot reload dev server port
  reload: 3000,
};

var urls = {
  public: '/',
};

var projectRoot = path.resolve(__dirname);

var clientSrc = path.join(projectRoot, 'src', 'client');

var absPaths = {
  clientSrc: clientSrc,
  buildOutput: path.join(projectRoot, 'buildOutput'),
  codegen: path.join(projectRoot, 'codegen'),
  nodeModules: path.join(projectRoot, 'node_modules'),
  coverage: path.join(projectRoot, 'coverage'),
  serverRoot: path.join(projectRoot, 'src', 'server'),

  mainEntryJit: path.join(clientSrc, 'main.browser-jit.ts'),
  vendorEntryJit: path.join(clientSrc, 'vendor-jit.ts'),

  mainEntryAot: path.join(clientSrc, 'main.browser-aot.ts'),
  vendorEntryAot: path.join(clientSrc, 'vendor-aot.ts'),

  testEntry: path.join(clientSrc, 'karma-entry.js'),
  staticFiles: path.join(clientSrc, 'static'),
};

var relPaths = {
  localDevRoot: 'buildOutput/',

  main: 'js/main-bundle.js',
  vendor: 'js/vendor-bundle.js',

  // allow for multiple entry points, hence multiple outputs
  bundle: 'js/[name]-bundle.js',
  sourceMap: 'js/[name]-bundle.js.map',
  chunk: 'js/[id]-chunk.js',
};

var patterns = {
  testSources: path.join(absPaths.clientSrc, '**/*.spec.ts'),
  appSources: path.join(absPaths.clientSrc, '**/!(*.spec).ts'),
  // The (\\|\/) piece accounts for path separators in *nix and Windows
  angularContext: /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
};

var rules = {

  // pre-loaders

  tslint: {
    enforce: 'pre',
    test: /\.ts$/,
    loader: 'tslint-loader',
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

  // Source map loader support for *.js files
  // Extracts SourceMaps for source files that are added as sourceMappingURL comment.
  javascriptTest: {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      // these packages have problems with their sourcemaps
      path.join(absPaths.nodeModules, '@angular'),
      path.join(absPaths.nodeModules, 'rxjs'),
    ],
  },

  // normal loaders

  // all `.ts` files will be compiled through tsc by `awesome-typescript-loader`.
  // `angular2-template-loader` converts template/style URLs into inlined template/styles.
  typescriptJit: {
    test: /\.ts$/,
    use: [
      'awesome-typescript-loader',
      'angular2-template-loader'
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
      /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files
    ],
  },

  typescriptAot: {
    test: /\.ts$/,
    use: [{
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: './tsconfig-aot.json',
      },
    }, {
      loader: 'angular2-template-loader',
    }],
    include: [
      absPaths.clientSrc,
      absPaths.codegen, // include (AOT) generated code
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.serverRoot, // skip server
      /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files
    ],
  },

  typescriptTest: {
    test: /\.ts$/,
    use: [
      'awesome-typescript-loader',
      'angular2-template-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
      /\.(e2e|async)\.ts$/, // skip end-to-end test and async TS files
    ],
  },

  // support for requiring component-scoped CSS as raw text
  // NOTE: this assumes that their filename ends in '.component.css'
  componentCss: {
    test: /\.component\.css$/,
    use: [
      'raw-loader',
      'postcss-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

  // support for requiring component-scoped Sass as raw text
  // NOTE: this assumes that their filename ends in 'component.scss'
  componentSass: {
    test: [/component\.scss$/, /color-picker\.scss$/],
    use: [
      'raw-loader',
      'postcss-loader',
      'sass-loader',
    ],
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

  // support for requiring global, crosswide CSS as <style> tag
  // NOTE: this assumes that their filename don't contain `component`
  globalCss: {
    test: /^(?!.*component).*\.css$/,
    /*
    use: [
      {
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    */
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
    ],
    include: [
      absPaths.clientSrc,
      absPaths.nodeModules, // allow to import CSS from third-party libraries
    ],
    exclude: [
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

  // support for requiring HTML as raw text
  html: {
    test: /\.html$/,
    loader: 'raw-loader',
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

  // instrument only code that isn't test or third-party
  // delay coverage until after tests are run, fixing transpiled source coverage error
  istanbul: {
    enforce: 'post',
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: [
      absPaths.clientSrc,
    ],
    exclude: [
      /\.(e2e|spec)\.ts$/, // skip all test files
      absPaths.nodeModules, // skip all node modules
      absPaths.buildOutput, // skip output
      absPaths.codegen, // skip (AOT) generated code
      absPaths.serverRoot, // skip server
    ],
  },

};

var noParse = [
  /.+zone\.js\/dist\/.+/,
];

var postcss = [

  autoprefixer({
    browsers: ['last 2 versions'],
  }),

];

var resolve = {

  // resolve files using only those extensions
  extensions: ['.ts', '.js', '.json'],

  // resolve modules also looking in those paths
  modules: [absPaths.nodeModules],
};

function buildDefines() {
  var packageDef = require('./package.json');

  return {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'VERSION': JSON.stringify(packageDef.version),
  };
}

var common = {
  urls: urls,
  ports: ports,
  absPaths: absPaths,
  relPaths: relPaths,
  patterns: patterns,
  rules: rules,
  noParse: noParse,
  postcss: postcss,
  resolve: resolve,
  buildDefines: buildDefines,
};

module.exports = common;
