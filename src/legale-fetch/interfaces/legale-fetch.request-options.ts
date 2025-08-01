import type { FetchRequestMethod } from './fetch-request-method.js';

export interface LegaleFetchRequestOptions {
    retries?: number;
    apiKey?: string;
    signal?: AbortSignal;
    token?: string;
    headers?: HeadersInit | Headers;
    method?: FetchRequestMethod;
    query?: Record<string, any>;
    body?: any;
}