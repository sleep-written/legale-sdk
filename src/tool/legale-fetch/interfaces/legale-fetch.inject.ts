import type { FetchFunction } from './fetch-function.js';

export interface LegaleFetchInject {
    fetch?:             FetchFunction;
    toJSONCamelCase?:   (v: any) => any;
    toJSONSnakeCase?:   (v: any) => any;
}
