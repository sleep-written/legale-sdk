import type { CreateDocumentRequest, DocumentDetail, Folder, GetDocumentsResponse, LegaleInject } from './interfaces/index.js';
import type { LegaleFetchObject } from '@/legale-auth/index.js';

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

    getFolders(signal?: AbortSignal): Promise<Folder[]> {
        return this.#legaleFetch.fetchJSON('api/folder', {
            ...this.#credentials,
            method: 'get',
            signal
        });
    }

    deleteFolder(id: number, signal?: AbortSignal): Promise<void> {
        return this.#legaleFetch.fetch(`api/folder/${id}`, {
            ...this.#credentials,
            method: 'delete',
            signal
        });
    }

    getDocuments(page: number, pageSize: number, signal?: AbortSignal): Promise<GetDocumentsResponse> {
        return this.#legaleFetch.fetchJSON('api/documents', {
            ...this.#credentials,
            method: 'get',
            query: { page, pageSize },
            signal
        });
    }

    getDocumentDetail(guid: string, signal?: AbortSignal): Promise<DocumentDetail> {
        return this.#legaleFetch.fetchJSON(`api/document/get/${guid}`, {
            ...this.#credentials,
            method: 'get',
            signal
        });
    }

    async createDocument(options: CreateDocumentRequest, signal?: AbortSignal): Promise<Document> {
        if (Buffer.isBuffer(options.file)) {
            options.file = options.file.toString('base64');
        }

        if (options.attachedFiles) {
            for (const attachedFile of options.attachedFiles) {
                if (Buffer.isBuffer(attachedFile.file)) {
                    attachedFile.file = attachedFile.file.toString('base64');
                }
            }

            (options as any).attachedFile = options.attachedFiles;
            delete (options as any).attachedFiles;
        }

        return this.#legaleFetch.fetchJSON('api/document/create', {
            ...this.#credentials,
            method: 'post',
            body: options,
            signal
        });
    }

    downloadDocument(guid: string, signal?: AbortSignal): Promise<Buffer> {
        return this.#legaleFetch.fetchBuffer(`media/${guid}`, {
            ...this.#credentials,
            method: 'get',
            signal
        });
    }

    deleteDocument(guid: string, signal?: AbortSignal): Promise<void> {
        return this.#legaleFetch.fetch(`api/document/delete/${guid}`, {
            ...this.#credentials,
            method: 'delete',
            signal
        });
    }
}