import type { FetchFunction, FetchResponse, LegaleFetchInject, LegaleFetchRequestOptions } from './interfaces/index.js';

import { FailedFetchResponseError } from './failed-fetch-response.error.js';
import { FailedFetchRequestError } from './failed-fetch-request.error.js';

import { toJSONCamelCase, toJSONSnakeCase } from '@/to-json/index.js';

export class LegaleFetch {
    #fetch:             FetchFunction;
    #origin:            string;
    #toJSONCamelCase:   (v: any) => any;
    #toJSONSnakeCase:   (v: any) => any;

    constructor(inject?: LegaleFetchInject) {
        this.#origin =          inject?.test
        ?   'https://dev.api.legale.io'
        :   'https://api.legale.io';

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

    async #executeFetch(path: string, request?: LegaleFetchRequestOptions): Promise<FetchResponse> {
        const headers = !(request?.headers instanceof Headers)
        ?   new Headers(request?.headers)
        :   request.headers;

        const init: RequestInit = {
            method: request?.method ?? 'get',
            headers,
        };

        // Setting "url" as an URL instance object
        const url = new URL(this.#origin);
        url.pathname = path;

        // Adding the literal query data as query strings into URL
        if (request?.query) {
            try {
                Object
                    .entries(this.#toJSONSnakeCase(request.query))
                    .forEach(([ key, v ]) => {
                        const value = this.#stringifyQueryValue(v);
                        url.searchParams.set(key, value);
                    });
            } catch (err: any) {
                throw new FailedFetchRequestError(
                    'The function `toJSONSnakeCase` has been failed',
                    err
                );
            }
        }

        // Setting authentication headers
        if (typeof request?.token === 'string') {
            headers.set('Authorization', `Bearer ${request.token}`);

        } else if (typeof request?.apiKey === 'string') {
            headers.set('Legale-Api-Key', request.apiKey);

        }

        // Setting the body of the request
        try {
            if (typeof request?.body === 'string') {
                init.body = request.body;
                if (!headers.has('Content-Type')) {
                    headers.set('Content-Type', 'text/plain; charset=utf-8');
                }

            } else if (request?.body != null) {
                init.body = JSON.stringify(this.#toJSONSnakeCase(request.body));
                if (!headers.has('Content-Type')) {
                    headers.set('Content-Type', 'application/json; charset=utf-8');
                }

            }
        } catch (err: any) {
            throw new FailedFetchRequestError(
                'Cannot JSON.stringify the incoming body',
                err
            );
        }

        return this.#fetch(url, init);
    }

    async fetch(path: string, request?: LegaleFetchRequestOptions): Promise<void> {
        const resp = await this.#executeFetch(path, request);
        if (!resp.ok) {
            throw new FailedFetchResponseError(
                resp.status,
                resp.statusText ??
                'Unknown fetch error'
            );
        }
    }
    
    async fetchJSON(path: string, request?: LegaleFetchRequestOptions): Promise<any> {
        const resp = await this.#executeFetch(path, request);
        const json = await resp
            .json()
            .catch(err => {
                throw new FailedFetchResponseError(
                    resp.status,
                    `The json fetch response function has failed`,
                    err
                )
            });

        if (!resp.ok) {
            throw new FailedFetchResponseError(
                resp.status,
                json['message'] ??
                json['details'] ??
                resp.statusText ??
                'Unknown fetch error'
            );
        }

        try {
            return this.#toJSONCamelCase(json);
        } catch (err: any) {
            throw new FailedFetchResponseError(
                resp.status,
                'The function `toJSONCamelCase` has been failed',
                err
            );
        }
    }
    
    async fetchBuffer(path: string, request?: LegaleFetchRequestOptions): Promise<Buffer> {
        const resp = await this.#executeFetch(path, request);

        try {
            const arr = await resp.arrayBuffer();
            return Buffer.from(arr);
        } catch (err: any) {
            throw new FailedFetchResponseError(
                resp.status,
                'Cannot extract the buffer from response',
                err
            );
        }
    }
}
