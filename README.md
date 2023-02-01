<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: nuxt-clockify
- Package name: nuxt-clockify
- Description: new clockify module for nuxt. NOT PRODUCTION READY! based on clockify-ts (i only use its return types for now)
-->

# nuxt-clockify

[![npm version][npm-version-src]][npm-version-href] [![npm downloads][npm-downloads-src]][npm-downloads-href] [![License][license-src]][license-href]

> new clockify module for nuxt. NOT PRODUCTION READY! <br> based on clockify-ts (I only use its return types for now)

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- Can get time entries ✅
- Can get current user ✅

## Quick Setup

1. Add `nuxt-clockify` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-clockify

# Using yarn
yarn add --dev nuxt-clockify

# Using npm
npm install --save-dev nuxt-clockify
```

2. Add `nuxt-clockify` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-clockify"],
});
```

3. create `.env` from `.env.example`

```bash
cp .env.example .env
```

4. add your api token to the field `NUXT_CLOCKIFY_API` in the `.env`

```text
NUXT_CLOCKIFY_API=token
```

5. last thing you need to do is add this in the `nuxt.config.ts` in the `runtimeConfig`

```typescript
 clockifyApi: "",
```

That's it! You can now use nuxt-clockify in your Nuxt app ✨

## Development

```typescript
import { useClockify, useClockifyDurationToHours } from "#clockify";
//get clockify class to work with
const clockify = useClockify();

//getting time entries
const timeEntryResponse = await clockify.timeEntries();
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-clockify/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-clockify
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-clockify.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-clockify
[license-src]: https://img.shields.io/npm/l/nuxt-clockify.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-clockify
