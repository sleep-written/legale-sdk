import type {
    CreateDocumentRequest, DocumentDetail, Document, Folder,
    GetDocumentsResponse, LegaleInject, SignStartRequest
} from './interfaces/index.js';

import type { LegaleFetchObject, LegaleRequestOptions } from '@/legale-auth/index.js';

import { LegaleFetch } from '@/legale-fetch/index.js';
import { LegaleAuth } from '@/legale-auth/index.js';

export class Legale extends LegaleAuth {
    #legaleFetch: LegaleFetchObject;

    get #credentials() {
        return {
            apiKey: this.apiKey,
            token: this.token
        };
    }

    constructor(inject?: LegaleInject) {
        const legaleFetch = inject?.legaleFetch ?? new LegaleFetch({ test: inject?.test });
        super(legaleFetch);
        this.#legaleFetch = legaleFetch;
    }

    getFolders(options?: LegaleRequestOptions): Promise<Folder[]> {
        return this.#legaleFetch.fetchJSON('api/folder', {
            ...this.#credentials,
            ...options,
            method: 'get'
        });
    }

    deleteFolder(id: number, options?: LegaleRequestOptions): Promise<void> {
        return this.#legaleFetch.fetch(`api/folder/${id}`, {
            ...this.#credentials,
            ...options,
            method: 'delete'
        });
    }

    getDocuments(page: number, pageSize: number, options?: LegaleRequestOptions): Promise<GetDocumentsResponse> {
        return this.#legaleFetch.fetchJSON('api/documents', {
            ...this.#credentials,
            ...options,
            method: 'get',
            query: { page, pageSize }
        });
    }

    getDocumentDetail(guid: string, options?: LegaleRequestOptions): Promise<DocumentDetail> {
        return this.#legaleFetch.fetchJSON(`api/document/get/${guid}`, {
            ...this.#credentials,
            ...options,
            method: 'get'
        });
    }

    async createDocument(data: CreateDocumentRequest, options?: LegaleRequestOptions): Promise<Document> {
        if (Buffer.isBuffer(data.file)) {
            data.file = data.file.toString('base64');
        }

        if (data.attachedFiles) {
            for (const attachedFile of data.attachedFiles) {
                if (Buffer.isBuffer(attachedFile.file)) {
                    attachedFile.file = attachedFile.file.toString('base64');
                }
            }

            (data as any).attachedFile = data.attachedFiles;
            delete (data as any).attachedFiles;
        }

        return this.#legaleFetch.fetchJSON('api/document/create', {
            ...this.#credentials,
            ...options,
            method: 'post',
            body: data
        });
    }

    downloadDocument(guid: string, options?: LegaleRequestOptions): Promise<Buffer> {
        return this.#legaleFetch.fetchBuffer(`media/${guid}`, {
            ...this.#credentials,
            ...options,
            method: 'get'
        });
    }

    deleteDocument(guid: string, options?: LegaleRequestOptions): Promise<void> {
        return this.#legaleFetch.fetch(`api/document/delete/${guid}`, {
            ...this.#credentials,
            ...options,
            method: 'delete'
        });
    }

    // async signStart(guid: string, data: SignStartRequest, options?: LegaleRequestOptions): Promise<string[]> {
    //     const result = await this.#legaleFetch.fetchJSON(`api/sign/start/${guid}`, {
    //         ...this.#credentials,
    //         ...options,
    //         method: 'post',
    //         body: data
    //     });

    //     return result.data;
    // }
}