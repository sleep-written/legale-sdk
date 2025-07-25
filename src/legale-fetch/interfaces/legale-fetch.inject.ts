import type { FetchFunction } from './fetch-function.js';

export interface LegaleFetchInject {
    test?:              boolean;
    fetch?:             FetchFunction;
    toJSONCamelCase?:   (v: any) => any;
    toJSONSnakeCase?:   (v: any) => any;
}
