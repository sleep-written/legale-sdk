import type { FetchResponse } from './fetch-response.js';

export type FetchFunction = (
    url: URL,
    init: RequestInit
) => Promise<FetchResponse>;