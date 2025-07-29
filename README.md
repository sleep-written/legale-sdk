# legale‑sdk
[![npm version](https://img.shields.io/npm/v/legale-sdk.svg)](https://www.npmjs.com/package/legale-sdk)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Unofficial SDK for the [Legale API](https://doc.legale.io), designed for developer ergonomics:

* Automatic JSON normalization to `camelCase`.
* Single entry point: `new Legale({ test: true|false })`.
* Helpers for authentication (API key or bearer token), folders, documents, and pagination.

---

## Disclaimer
This is an unofficial, community‑maintained SDK and is not affiliated with or endorsed by Legale. It is provided "as is" without any warranties, express or implied. API behavior and endpoints may change at any time and break this client. You are responsible for complying with Legale’s terms, handling credentials securely, and validating outputs before using them in production. Use at your own risk.

## Installation
```shell
npm i --save legale-sdk
```

## Quick start
```ts
import { Legale } from 'legale-sdk';

// Using the testing environment
const legale = new Legale({ test: true });

// Log in using the API key method
await legale.setAPIKey('xxxx-xxxx-...');

// Getting the first 10 documents
const result = await legale.getDocuments(1, 10);
console.log(result);
```

## Environment
Legale has two environments:
* Testing: [https://dev.api.legale.io](https://dev.api.legale.io)
* Production: [https://api.legale.io](https://api.legale.io)

Choose the environment:

```ts
import { Legale } from 'legale-sdk';

// Using the testing environment
const legale01 = new Legale({ test: true });

// Using the production environment
const legale02 = new Legale({ test: false });

// Using the production environment as default
const legale03 = new Legale();
```

## Authentication
To use the Legale API you must authenticate using either an API key or a bearer token. You have two authentication methods:

* **API Key**: Generated in the web app. The API key is valid until you revoke it.
* **Bearer Token**: Generated with your email and password. This method returns a temporary token that expires after a few hours.

```ts
import { Legale } from 'legale-sdk';

// Using the testing environment
const legale = new Legale({ test: true });

// Log in using the API key method
await legale.setAPIKey('xxxx-xxxx-...');

// Log in using the bearer token method
await legale.getToken('user@email.io', '53cur3-p455w0r1d');
```

## API Reference
### `Legale.getFolders`
Returns a `Promise<Folder[]>` ([go to interface](https://github.com/sleep-written/legale-sdk/blob/master/src/legale/interfaces/folder.ts)).

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
const folders = await legale.getFolders();
```

### `Legale.deleteFolder`
Deletes a folder. Returns a `Promise<void>`. Arguments:

* **guid**: `string`.

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
await legale.deleteFolder(
   // The folder GUID
   'aaaa-bbbb-...' 
);
```

### `Legale.getDocuments`
Gets a document list using pagination. Returns a `Promise<GetDocumentsResponse>` ([go to interface](https://github.com/sleep-written/legale-sdk/blob/master/src/legale/interfaces/get-documents.response.ts)). Arguments:

* **page**: `number` → The page index to show *(the first page is `1` by the API)*.
* **pageSize**: `number` → Number of items per page.

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
const result = await legale.getDocuments(
   1,    // Page index, the first page is 1.
   10    // Page size
);
```

### `Legale.getDocumentDetail`
Gets detailed information about a document. Returns a `Promise<DocumentDetail>` ([go to interface](https://github.com/sleep-written/legale-sdk/blob/master/src/legale/interfaces/document-detail.ts)). Arguments:

* **guid**: `string`.

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
const document = await legale.getDocumentDetail('aaaa-bbbb-...');
```

### `Legale.createDocument`
Uploads a PDF file into Legale. Returns a `Promise<Document>` ([go to interface](https://github.com/sleep-written/legale-sdk/blob/master/src/legale/interfaces/document.ts)). Arguments:

* **request**: `CreateDocumentRequest` ([go to interface](https://github.com/sleep-written/legale-sdk/blob/master/src/legale/interfaces/create-document.request.ts)).

```ts
import { Legale } from 'legale-sdk';
import { readFile } from 'fs/promises';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
const document = await legale.createDocument({
   file: await readFile('/path/to/file.pdf'),
   fileName: 'root/remote/path/to/file.pdf',
   description: 'Testing file'
});
```

### `Legale.downloadDocument`
Gets the document binary data (the PDF file). Returns a `Promise<Buffer>`. Arguments:

* **guid**: `string`.

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
const buffer = await legale.downloadDocument('aaaa-bbbb-...');
```

### `Legale.deleteDocument`
Deletes the document from Legale. Returns a `Promise<void>`. Arguments:

* **guid**: `string`.

```ts
import { Legale } from 'legale-sdk';

const legale = new Legale({ test: true });
await legale.setAPIKey('xxxx-xxxx-...');
await legale.deleteDocument('aaaa-bbbb-...');
```
