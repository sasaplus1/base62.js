const path = require('path');

const typescript = require('rollup-plugin-typescript');

const meta = require('./package.json');

module.exports = function(config) {
  config.set({
    basePath: path.resolve(__dirname),
    browsers: ['ChromeHeadlessNoSandbox'],
    client: {
      mocha: {
        reporter: 'html'
      }
    },
    customLaunchers: {
      // NOTE: https://docs.travis-ci.com/user/chrome#Sandboxing
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        chromeDataDir: path.resolve(__dirname, '.chrome'),
        flags: ['--no-sandbox']
      }
    },
    files: [
      {
        pattern: require.resolve('power-assert/build/power-assert.js'),
        type: 'js',
        watched: false
      },
      {
        pattern: require.resolve('./dist/base62.legacy.js'),
        type: 'js',
        watched: true
      },
      {
        included: false,
        pattern: require.resolve('./dist/base62.legacy.js.map'),
        served: true
      },
      {
        pattern: require.resolve('./test/index.ts'),
        type: 'js',
        watched: true
      }
    ],
    frameworks: ['mocha'],
    preprocessors: {
      [require.resolve('./test/index.ts')]: ['rollup']
    },
    reporters: ['dots'],
    rollupPreprocessor: {
      output: {
        format: 'umd',
        name: meta.name,
        sourcemap: 'inline'
      },
      plugins: [
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        })
      ]
    }
  });
};
