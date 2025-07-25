import type { LegaleFetchRequestOptions } from '@/legale-fetch/index.js';

export interface LegaleFetchObject {
    fetch(path: string, request?: LegaleFetchRequestOptions): Promise<void>;

    fetchJSON(path: string, request?: LegaleFetchRequestOptions): Promise<any>;

    fetchBuffer(path: string, request?: LegaleFetchRequestOptions): Promise<Buffer>;
}
