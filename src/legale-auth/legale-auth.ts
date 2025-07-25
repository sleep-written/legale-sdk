import type { AuthMethod, LegaleFetchObject } from './interfaces/index.js';
import { LegaleFetch } from '@/legale-fetch/legale-fetch.js';

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

    get isLogged(): boolean {
        return (
            typeof this.#token  === 'string' ||
            typeof this.#apiKey === 'string'
        );
    }

    get authMethod(): AuthMethod | null {
        switch (true) {
            case typeof this.#token  === 'string': {
                return 'bearer-token';
            }
            
            case typeof this.#apiKey === 'string': {
                return 'api-key';
            }

            default: {
                return null;
            }
        }
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

    logout(): void {
        this.#token = undefined;
        this.#apiKey = undefined;
    }
}