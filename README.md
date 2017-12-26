template-npm-package
=======================

This is a template for an npm package. It supports three output targets: CommonJS, EcmaScript module, and UMD.

Description of npm tasks:

| script | comments |
| ------ | -------- |
| build  | create CommonJS, ES module, and UMD builds |
| bundle | run Webpack to create a UMD bundle |
| clean | remove generated artifacts |
| lint | run eslint on `src` directory |
| preversion | an `npm version` hook; [read the docs!](https://docs.npmjs.com/cli/version) |
| postversion | an `npm version` hook; [read the docs!](https://docs.npmjs.com/cli/version) |
| transpile:commonjs | run babel on `src` directory; transpile `import/export` statements for a CommonJS compatible build |
| transpile:es |  run babel on `src` directory; *do not* transpile `import/export` statements for an ES module compatible build (used by bundlers for tree-shaking) |
| test | run `mocha`; searches for any files matching the pattern "src/**/*.test.js" |
| test:coverage | run `mocha` and collect test coverage statistics |
| version | build the library and run all `npm version` hooks; run prior to `npm publish`; [read the docs!](https://docs.npmjs.com/cli/version) |

