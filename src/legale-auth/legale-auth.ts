import type { AuthMethod, LegaleRequestOptions, LegaleFetchObject } from './interfaces/index.js';

import { FailedFetchResponseError, LegaleFetch } from '@/legale-fetch/index.js';
import { FailedLoginError } from './failed-login.error.js';

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

    async getToken(email: string, password: string, options?: LegaleRequestOptions): Promise<void> {
        try {
            const json = await this.#legaleFetch.fetchJSON('api/token', {
                ...options,
                method: 'post',
                body: { email, password }
            });

            this.#token = json.token;
            this.#apiKey = undefined;

        } catch (err: any) {
            if (
                err instanceof FailedFetchResponseError &&
                (err.status === 401 || err.status === 403)
            ) {
                throw new FailedLoginError(err);
            } else {
                throw err;
            }
        }
    }

    setAPIKey(apiKey: string): void {
        this.#token = undefined;
        this.#apiKey = apiKey;
    }

    logout(): void {
        this.#token = undefined;
        this.#apiKey = undefined;
    }
}