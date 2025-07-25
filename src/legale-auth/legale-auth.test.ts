import type { LegaleFetchObject } from './interfaces/index.js';

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

test('Login with token', async t => {
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
});

test('Login with apiKey', async t => {
    const legaleFetch = legaleFetchFactory({
        fetch: () => Promise.resolve()
    });

    const legaleAuth = new LegaleAuth(legaleFetch);
    await legaleAuth.setApiKey(
        'jodeeeeeer'
    );

    t.true(typeof legaleAuth.token === 'undefined');
    t.is(legaleAuth.apiKey, 'jodeeeeeer');
});