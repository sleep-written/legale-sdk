# legale‑sdk
[![npm version](https://img.shields.io/npm/v/legale-sdk.svg)](https://www.npmjs.com/package/legale-sdk)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Unofficial, community‑driven Node.js SDK for the [Legale.io](https://legale.io) e‑signature & document‑management API.** 100 % TypeScript, fully typed end‑to‑end.

---

## Table of Contents
1. [Disclaimer](#️disclaimer)
2. [Features](#features)
3. [Installation](#installation)
4. [Environments](#️environments)
5. [Quick Start](#quickstart)
6. [Authentication](#authentication)
7. [API Reference](#api-reference)
   *  [Documents](#documents)
   *  [Folders](#folders)
8. [JSON Transform Helpers](#️json-transform-helpers)
9. [Testing](#testing)
10. [Build & Bundle](#️build--bundle)
11. [Contributing](#contributing)

---

## Disclaimer
This package **is not affiliated with Legale.io**. It is built and maintained by the community. **Use it at your own risk.** Review the source, pin your versions, and—preferably—keep a glass of vodka handy while browsing the Swagger docs.

---

## Features
* **Fully typed** – Zero‑`any` public surface, generated `.d.ts` included.  
* **Modern ESM** – `type: "module"`, Node 20 +.  
* **Two authentication flows** – API Key or JWT token.  
* **Transparent JSON key conversion** – `LegaleFetch` maps snake_case ⇄ camelCase under the hood; the standalone helpers (`toJSONSnakeCase`, `toJSONCamelCase`) are exported for ad‑hoc needs.  
* **Idiomatic pagination** – Simple `page` / `pageSize` parameters.  
* **Pluggable fetch layer** – Inject your own `fetch` implementation for browsers, tests or retries.

---

## Installation
```bash
npm i legale-sdk  # yarn add / pnpm add also work
```

The SDK ships pre‑compiled to `dist/` with ES2024 output and bundled typings. No transpiler required.

---

## Environments
| Environment    | Base URL                    | Use case     |
| -------------- | --------------------------- | ------------ |
| **Testing**    | `https://dev.api.legale.io` | Sandbox / QA |
| **Production** | `https://api.legale.io`     | Live data    |

`Legale` defaults to **production**. Pass `{ test: true }` to switch:

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true }); // ↖︎ points to dev.api
```

---

## Quick Start
```ts
import { Legale } from 'legale-sdk';

const legale = new Legale();   // Production by default
await legale.setAPIKey(process.env.LEGALE_API_KEY!);

const { rows } = await legale.getDocuments(1, 20);
console.table(rows);
```

---

## Authentication
Choose one of the following:

### 1. API Key
```ts
await legale.setAPIKey('aaa-bbb-ccc‑ddd');
```

### 2. Email + Password → JWT
```ts
await legale.getToken('user@example.com', 'S3cureP4ss');
```

The last method called wins (calling `setAPIKey` clears the JWT and vice‑versa).

---

## API Reference
Below is the high‑level surface. All methods return `Promise<…>` and throw rich error classes (`FailedLoginError`, `FailedFetchRequestError`, `FailedFetchResponseError`). Refer to the source for complete TypeScript definitions.

### Documents
| Method              | Signature                                                   | Description                                                                    |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `getDocuments`      | `(page: number, pageSize: number)` → `GetDocumentsResponse` | Paginated list of documents.                                                   |
| `getDocumentDetail` | `(guid: string)` → `DocumentDetail`                         | Metadata and signers for a single document.                                    |
| `createDocument`    | `(options: CreateDocumentRequest)` → `Document`             | Upload a PDF and request signatures. Buffers are automatically base64‑encoded. |
| `deleteDocument`    | `(guid: string)` → `void`                                   | Permanently removes a document.                                                |

### Folders
| Method       | Signature         | Description                                             |
| ------------ | ----------------- | ------------------------------------------------------- |
| `getFolders` | `()` → `Folder[]` | Retrieve the folder tree for the authenticated account. |

> **Pagination** – `getDocuments` uses **1‑based** indices (`page = 1` ⇒ first page).

---

## JSON Transform Helpers
Legale’s REST endpoints speak **snake_case**, but the SDK converts everything for you:

```ts
const doc = await legale.getDocumentDetail(guid);
// → all keys arrive in camelCase
```

Outgoing bodies are likewise converted to snake\_case automatically.
If you need the transformers outside `Legale` (e.g. for fixtures or DB dumps), you can still import them:

```ts
import { toJSONCamelCase, toJSONSnakeCase } from 'legale-sdk';

const uiData  = toJSONCamelCase(rawApiResponse);
const apiBody = toJSONSnakeCase(formData);
```

Both helpers recurse through plain objects, arrays, `Set`, `Map`, and convert ISO date strings (`YYYY‑MM‑DDThh:mm:ss.sssZ`) to native `Date` instances on the way in—and back to ISO on the way out.

---

## Testing
Unit tests run with [AVA](https://github.com/avajs/ava):

```bash
node --run test
```

Tests mock the network layer; no real calls are made.

---

## Build & Bundle
```bash
node --run build
```

`bb-path-alias` resolves `@/` imports and `tsc-alias` rewrites path mappings in the generated declaration files.

---

## Contributing
1. Fork & clone.
2. `npm i`.
3. Add tests for any new behaviour.
4. Run `node --run build && node --run test`.
5. Open a PR—descriptive commit history & clean diff appreciated.

Feel free to open issues for bugs, use‑cases, or missing endpoints.