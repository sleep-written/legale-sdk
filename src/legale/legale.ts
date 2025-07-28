import type { DocumentDetail, Folder, GetDocumentsResponse, LegaleInject } from './interfaces/index.js';
import type { LegaleFetchObject } from '@/legale-auth/index.js';

import { LegaleFetch } from '@/legale-fetch/index.js';
import { LegaleAuth } from '@/legale-auth/index.js';

export class Legale extends LegaleAuth {
    #legaleFetch: LegaleFetchObject;

    constructor(inject?: LegaleInject) {
        const legaleFetch = inject?.legaleFetch ?? new LegaleFetch({ test: inject?.test });
        super(legaleFetch);
        this.#legaleFetch = legaleFetch;
    }

    getFolders(): Promise<Folder[]> {
        return this.#legaleFetch.fetchJSON('api/folder', {
            method: 'get',
            apiKey: this.apiKey,
            token: this.token
        });
    }

    getDocuments(page: number, pageSize: number): Promise<GetDocumentsResponse> {
        return this.#legaleFetch.fetchJSON('api/documents', {
            method: 'get',
            apiKey: this.apiKey,
            token: this.token,
            query: { page, pageSize }
        });
    }

    getDocumentDetail(guid: string): Promise<DocumentDetail> {
        return this.#legaleFetch.fetchJSON(`api/document/get/${guid}`, {
            method: 'get',
            apiKey: this.apiKey,
            token: this.token
        });
    }
}