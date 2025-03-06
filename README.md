# Nitro Guards Module

[![Develit][develit-src]][develit-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Introduction
The **Nitro Guards Module** brings **NestJS-like Guards functionality** to **Nitro**. It allows developers to define and register guards that can be used to protect event handlers. This module provides:

- `defineNitroGuard(event => {})` – Utility to register a custom guard.
- `defineGuardEventHandler({ guards }, handler)` – An enhanced version of `defineEventHandler` that supports guard execution.
- **Auto-imports** – The utilities and all guards inside the `guards` directory are automatically available without manual imports.

This module supports both **Nitro** and **Nuxt** configurations. You can add it to:

### Nitro (`nitro.config.ts`):
```ts
export default defineNitroConfig({
  modules: ["@develit-io/nitro-guards"],
});
```

### Nuxt (`nuxt.config.ts`):
```ts
export default defineNuxtConfig({
  modules: ["@develit-io/nitro-guards"],
});
```

---

## Installation

Install the module via **pnpm**, **npm**, or **yarn**:
```sh
pnpm add @develit-io/nitro-guards
```

Or using npm:
```sh
npm install @develit-io/nitro-guards
```

---

## Usage

### 1️⃣ Defining a Custom Guard
A guard is a function that receives an event and determines whether the request should proceed.

```ts
// guards/auth.guard.ts
export default defineNitroGuard((event) => {
  const authHeader = getHeader(event, 'Authorization');
  
  if (!authHeader || authHeader !== 'Bearer my-secret-token') {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }
});
```

---

### 2️⃣ Using Guards in an Event Handler
Use `defineGuardEventHandler` to protect an event handler with one or more guards.

```ts
// server/api/protected.ts
export default defineGuardEventHandler({
  guards: [authGuard],
}, (event) => {
  return { message: "You have access!" };
});
```

Here, `authGuard` runs before the handler. If it throws an error, the handler execution is stopped.

---

### 3️⃣ Auto-imports
- The utilities `defineNitroGuard` and `defineGuardEventHandler` are automatically available.
- All files inside the `guards/` directory are **auto-imported**, making guard usage seamless.

You **do not need** to manually import them in your Nitro application.

---

## API Reference

### `defineNitroGuard`
```ts
declare function defineNitroGuard(def: NitroGuard): NitroGuard;
```
- Registers a custom guard function.
- If the guard throws an error, the request is denied.

### `defineGuardEventHandler`
```ts
declare function defineGuardEventHandler<T>(config: {
    guards: NitroGuard[];
}, onComplete: OnComplete<T>): h3.EventHandler<h3.EventHandlerRequest, Promise<T>>;
```
- Accepts a list of guards and an event handler.
- Executes guards before calling the handler.
- **Guards are applied sequentially** in the order they are passed. Ensure proper ordering to avoid unintended behavior.

---

## Example: Multiple Guards

You can use multiple guards by passing them as an array:

```ts
// guards/role.guard.ts
export default defineNitroGuard((event) => {
  if (event.req.headers['x-role'] !== 'admin') {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }
});
```

```ts
// server/api/admin.ts
export default defineGuardEventHandler({
  guards: [authGuard, roleGuard],
}, (event) => {
  return { message: "Admin access granted!" };
});
```

**Note:** Guards are executed in the order they are defined. If `authGuard` fails, `roleGuard` will not run.

---

## Conclusion
The **Nitro Guards Module** makes it easy to **protect Nitro event handlers** using a modular and reusable approach inspired by **NestJS Guards**. With built-in auto-imports and a simple API, you can enhance your application's security seamlessly.

🚀 **Start using Nitro Guards today!**

## License
[MIT © Develit.io](./LICENSE.md) - Made with 💚

[npm-version-src]: https://img.shields.io/npm/v/@develit-io/nitro-guards/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@develit-io/nitro-guards

[npm-downloads-src]: https://img.shields.io/npm/dt/@develit-io/nitro-guards.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@develit-io/nitro-guards

[license-src]: https://img.shields.io/npm/l/@develit-io/nitro-guards.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@develit-io/nitro-guards

[develit-src]: https://develit.io/develit-sticker.svg
[develit-href]: https://develit.io/en

