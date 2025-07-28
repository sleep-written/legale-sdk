# legale-sdk
A non-official [legale.io](https://legale.io) API SDK for node, converting all "_snake_case_" keys into "__camelCase__" keys. You can use the testing or the production environment.

## __WARNING__
This SDK is community-driven and unofficial. Use at your own risk, ~~preferably while drinking vodka and crying over Swagger docs~~.

## Installation
```shell
npm i --save legale-sdk
```

## Usage
Legale has 2 environments:
-   Testing: [https://dev.api.legale.io](https://dev.api.legale.io):
    ```ts
    import { Legale } from 'legale-sdk'; 

    // Initialize legale in testing environment
    const legale = new Legale({ test: true });
    ```

-   Production: [https://api.legale.io](https://api.legale.io):
    ```ts
    import { Legale } from 'legale-sdk';

    // Initialize legale in production environment
    const legale01 = new Legale({ test: false });

    // This is valid too for use production environment
    const legale02 = new Legale();
    ```

To define which environment do you want to use, 

### Login
Before to make requests to the API, you must login into legale

#### With [Bearer Token](https://doc.legale.io/docs/v1/overview#1-bearer-token):
This method generates a temporal token, will expires into several hours:
```ts
import { Legale } from 'legale-sdk'; 

// Initialize legale
const legale = new Legale();

// Login using credentials (generates a temporal token)
await legale.getToken('i-am-a-real-user.trust-me@gmail.com', 'hello-world');
```

#### With [API Key](https://doc.legale.io/docs/v1/overview#1-bearer-token):
This method is useful if you generates an API Key in legale platform:
```ts
import { Legale } from 'legale-sdk'; 

// Initialize legale
const legale = new Legale();

// Login using an API Key
await legale.setAPIKey('aaa-thats-3as...');
```

## Get documents ([API reference](https://doc.legale.io/docs/v2/document/list#api-detail))
Get a document list using pagination:
```ts
import { Legale } from 'legale-sdk'; 

// Initialize legale
const legale = new Legale();
await legale.setAPIKey('aaa-thats-3as...');

// Get documents using pagination
const result = await legale.getDocuments(1, 10);
console.log(result);
```

### Request
-   __page__: `number`: The page do you want to list. Starts with index 1.
-   __pageSize__: `number`: The amount of elements in the page.

### Response
#### Interface `GetDocumentsResponse`
-   __count__: `number`;
-   __next__: `string` | `null`;
-   __previous__: `string` | `null`;
-   __results__: `Document[]`;

#### Interface `Document`
-   __GUID__: `string`;
-   __docId__: `string`;
-   __document__: `string`;
-   __fileName__: `string`;
-   __description__: `string`;
-   __createdAt__: `Date`;
-   __updatedAt__: `Date`;
-   __sign_status__: `number`;
-   __comment__: `null`;
-   __callbackUrl__: `null`;
-   __callbackKey__: `null`;

## Get document detail ([API reference](https://doc.legale.io/docs/v1/document/detail))
```ts
import { Legale } from 'legale-sdk'; 

// Initialize legale
const legale = new Legale();
await legale.setAPIKey('aaa-thats-3as...');

// Get document detail using GUID
const result = await legale.getDocumentDetail('xxxx-xxxx-...');
console.log(result);
```
### Request
-   __GUID__: `string`;

### Response
#### Interface `DocumentDetail`
-   __GUID__: `string`;
-   __docId__: `string`;
-   __document__: `string`;
-   __folder__: `string`;
-   __originDocument__: `string`;
-   __fileName__: `string`;
-   __subject__: `null`;
-   __description__: `string`;
-   __createdAt__: `Date`;
-   __updatedAt__: `Date`;
-   __signStatus__: `number`;
-   __comment__: `null`;
-   __signatureKey__: `null`;
-   __base64__: `string`;
-   __callbackUrl__: `null`;
-   __callbackKey__: `null`;
-   __deleteAfterCallback__: `false`;
-   __isSkipNotification__: `false`;
-   __owner__: `Owner`;
-   __signList__: `Sign[]`;

#### Interface `Owner`
-   __email__: `string`;
-   __role__: `number`;
-   __nickname__: `null`;
-   __firstname__: `string`;
-   __lastname1__: `string`;
-   __lastname2__: `string`;
-   __avatar__: `null`;
-   __gender__: `number`;
-   __idType__: `number`;
-   __idNumber__: `string`;
-   __userVideo__: `string`;

#### Interface `Sign`
-   __id__: `number`;
-   __signMethod__: `string`;
-   __signerInfo__: `SignerInfo`;

#### Interface `SignerInfo`
-   __id__: `number`;
-   __email__: `string`;
-   __phone__: `null`;
-   __firstname__: `string`;
-   __lastname1__: `string`;
-   __lastname2__: `string`;