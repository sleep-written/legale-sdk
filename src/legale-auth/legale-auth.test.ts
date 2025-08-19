import type { LegaleFetchObject } from './interfaces/index.js';

import { FailedFetchResponseError } from '@/legale-fetch/index.js';
import { FailedLoginError } from './failed-login.error.js';
import { LegaleAuth } from './legale-auth.js';
import test from 'ava';

function legaleFetchFactory(methods: Partial<LegaleFetchObject>): LegaleFetchObject {
    return {
        fetch:          () => Promise.reject('Not implemented'),
        fetchJSON:      () => Promise.reject('Not implemented'),
        fetchBuffer:    () => Promise.reject('Not implemented'),
        ...methods
    };
}

test('Login with token → success', async t => {
    const legaleFetch = legaleFetchFactory({
        fetchJSON: () => Promise.resolve({ token: 'zeta paga la coca' } as any)
    });
    
    const legaleAuth = new LegaleAuth(legaleFetch);
    await legaleAuth.getToken(
        'sdfgsdfg@sdfgsdf.cl',
        'sdfgsdfgsd'
    );

    t.is(legaleAuth.token,'zeta paga la coca');
    t.true(typeof legaleAuth.apiKey === 'undefined');
    t.true(legaleAuth.isLogged);
    t.is(legaleAuth.authMethod, 'bearer-token');
});

test('Login with token → failed', async t => {
    const legaleFetch = legaleFetchFactory({
        fetchJSON: () => Promise.reject(
            new FailedFetchResponseError(401, 'Incorrect credentials')
        )
    });
    
    const legaleAuth = new LegaleAuth(legaleFetch);
    await t.throwsAsync(
        () => legaleAuth.getToken(
            'sdfgsdfg@sdfgsdf.cl',
            'sdfgsdfgsd'
        ),
        {
            instanceOf: FailedLoginError,
            message: 'Failed to login into Legale'
        }
    );
});

test('Login with APIKey → success', async t => {
    const legaleFetch = legaleFetchFactory({
        fetch: () => Promise.resolve()
    });

    const legaleAuth = new LegaleAuth(legaleFetch);
    await legaleAuth.setAPIKey(
        'jodeeeeeer'
    );

    t.true(typeof legaleAuth.token === 'undefined');
    t.is(legaleAuth.apiKey, 'jodeeeeeer');
    t.true(legaleAuth.isLogged);
    t.is(legaleAuth.authMethod, 'api-key');
});