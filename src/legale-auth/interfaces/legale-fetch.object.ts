import type { LegaleFetchRequestOptions } from '@/legale-fetch/index.js';

export interface LegaleFetchObject {
    fetch(path: string, request?: LegaleFetchRequestOptions): Promise<void>;

    fetchJSON<T = any>(path: string, request?: LegaleFetchRequestOptions): Promise<T>;

    fetchBuffer(path: string, request?: LegaleFetchRequestOptions): Promise<Buffer>;
}
