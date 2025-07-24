import type { FetchFunction, FetchResponse, LegaleFetchInject, LegaleFetchRequestOptions } from './interfaces/index.js';

import { STATUS_CODES } from 'http';
import { toJSONCamelCase } from '@tool/to-json-camel-case/index.js';
import { toJSONSnakeCase } from '@tool/to-json-snake-case/index.js';

export class LegaleFetch {
    #fetch: FetchFunction;
    #toJSONCamelCase: (v: any) => any;
    #toJSONSnakeCase: (v: any) => any;

    constructor(inject?: LegaleFetchInject) {
        this.#fetch =           inject?.fetch           ?? fetch;
        this.#toJSONCamelCase = inject?.toJSONCamelCase ?? toJSONCamelCase;
        this.#toJSONSnakeCase = inject?.toJSONSnakeCase ?? toJSONSnakeCase;
    }

    #stringifyQueryValue(value: any): string {
        switch (true) {
            case typeof value === 'string': {
                return value;
            }

            default: {
                return JSON.stringify(value);
            }
        }
    }

    async #executeFetch(url: URL | string, request?: LegaleFetchRequestOptions): Promise<FetchResponse> {
        const headers = !(request?.headers instanceof Headers)
        ?   new Headers(request?.headers)
        :   request.headers;

        const init: RequestInit = {
            method: request?.method ?? 'get',
            headers,
        };

        // Setting "url" as an URL instance object
        if (typeof url === 'string') {
            url = new URL(url);
        }
        
        // Adding the literal query data as query strings into URL
        if (request?.query) {
            Object
                .entries(this.#toJSONSnakeCase(request.query))
                .forEach(([ key, v ]) => {
                    const value = this.#stringifyQueryValue(v);
                    url.searchParams.set(key, value);
                });
        }

        // Setting authentication headers
        if (typeof request?.token === 'string') {
            headers.set('Authorization', `Bearer ${request.token}`);

        } else if (typeof request?.apiKey === 'string') {
            headers.set('Legale-Api-Key', request.apiKey);

        }

        // Setting the body of the request
        if (typeof request?.body === 'string') {
            headers.set('Content-Type', 'text/plain; charset=utf-8');
            init.body = request.body;

        } else if (request?.body != null) {
            if (!Buffer.isBuffer(request.body)) {
                headers.set('Content-Type', 'application/json; charset=utf-8');
                init.body = JSON.stringify(this.#toJSONSnakeCase(request.body));
            } else {
                throw new Error(`Buffer as request body isn't supported`);
            }

        }

        // Catch response errors
        const resp = await this.#fetch(url, init);
        if (!resp.ok) {
            const json = await resp.json();
            throw new Error(
                json['message'] ??
                json['details'] ??
                STATUS_CODES[resp.status] ??
                'Unknown fetch error'
            )
        }

        return resp;
    }
    
    async fetchJSON<T = any>(url: URL | string, request?: LegaleFetchRequestOptions): Promise<T> {
        const resp = await this.#executeFetch(url, request);
        const json = await resp.json();
        return this.#toJSONCamelCase(json);
    }
}
