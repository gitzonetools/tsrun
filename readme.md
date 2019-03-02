# @gitzone/tsrun
run typescript programs efficiently

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@gitzone/tsrun)
* [gitlab.com (source)](https://gitlab.com/gitzone/tsrun)
* [github.com (source mirror)](https://github.com/gitzone/tsrun)
* [docs (typedoc)](https://gitzone.gitlab.io/tsrun/)

## Status for master
[![build status](https://gitlab.com/gitzone/tsrun/badges/master/build.svg)](https://gitlab.com/gitzone/tsrun/commits/master)
[![coverage report](https://gitlab.com/gitzone/tsrun/badges/master/coverage.svg)](https://gitlab.com/gitzone/tsrun/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@gitzone/tsrun.svg)](https://www.npmjs.com/package/@gitzone/tsrun)
[![Known Vulnerabilities](https://snyk.io/test/npm/@gitzone/tsrun/badge.svg)](https://snyk.io/test/npm/@gitzone/tsrun)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

To simply run a TypeScript file on the fly type

```typescript
tsrun myfiletorun.ts
```

There are options available:

- `--web` will inject browser types. this is useful when testing code with polyfills on node, but that is meant for the browser later on.

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://gitzone.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
