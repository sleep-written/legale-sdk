import { LegaleFetch } from '@/legale-fetch/legale-fetch.js';
import type { LegaleFetchObject } from './interfaces/index.js';

export class LegaleAuth {
    #legaleFetch: LegaleFetchObject;

    #token?: string;
    get token(): string | undefined {
        return this.#token;
    }

    #apiKey?: string;
    get apiKey(): string | undefined {
        return this.#apiKey;
    }

    constructor(legaleFetch?: LegaleFetchObject) {
        this.#legaleFetch = legaleFetch ?? new LegaleFetch();
    }

    async getToken(email: string, password: string): Promise<void> {
        const json = await this.#legaleFetch.fetchJSON('api/token', {
            method: 'post',
            body: { email, password }
        });

        this.#token = json.token;
        this.#apiKey = undefined;
    }

    async setApiKey(apiKey: string): Promise<void> {
        await this.#legaleFetch.fetch('api/documents', {
            query: { page: 1, pageSize: 0 },
            apiKey
        });

        this.#token = undefined;
        this.#apiKey = apiKey;
    }
}