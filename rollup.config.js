import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

import meta from './package.json';

const name = meta.name.replace(/\.js$/, '');

const config = [];

if (process.env.build === 'esm') {
  config.push({
    input: './index.ts',
    output: {
      file: './index.mjs',
      format: 'esm'
    },
    plugins: [
      typescript({
        module: 'ESNext',
        newLine: 'lf',
        strict: true,
        target: 'ESNext'
      })
    ]
  });
}

if (process.env.build === 'umd') {
  const banner = [
    '/*!',
    ' * @license base62.js Copyright(c) 2012 sasa+1',
    ' * https://github.com/sasaplus1/base62.js',
    ' * Released under the MIT license.',
    ' */'
  ].join('\n');

  config.push(
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/${name}.js`,
        format: 'umd',
        name,
        sourcemap: true
      },
      plugins: [
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ESNext'
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/${name}.min.js`,
        format: 'umd',
        name,
        sourcemap: true
      },
      plugins: [
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ESNext'
        }),
        terser({
          output: {
            preamble: banner
          },
          sourcemap: true
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/${name}.legacy.js`,
        format: 'umd',
        name,
        sourcemap: true
      },
      plugins: [
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        })
      ]
    },
    {
      input: './index.ts',
      output: {
        banner,
        file: `./dist/${name}.legacy.min.js`,
        format: 'umd',
        name,
        sourcemap: true
      },
      plugins: [
        typescript({
          newLine: 'lf',
          strict: true,
          sourceMap: true,
          target: 'ES5'
        }),
        terser({
          output: {
            preamble: banner
          },
          sourcemap: true
        })
      ]
    }
  );
}

export default config;
