import type { FetchRequestMethod } from './fetch-request-method.js';

export interface LegaleFetchRequestOptions {
    apiKey?: string;
    token?: string;
    headers?: HeadersInit | Headers;
    method?: FetchRequestMethod;
    query?: Record<string, any>;
    body?: any;
}