import type { FetchFunction, FetchResponse, LegaleFetchInject } from './interfaces/index.js';

import { FailedFetchResponseError } from './failed-fetch-response.error.js';
import { FailedFetchRequestError } from './failed-fetch-request.error.js';
import { LegaleFetch } from './legale-fetch.js';

import test from 'ava';

function fetchFactory(callback: (url: URL, init: RequestInit) => Partial<FetchResponse>): FetchFunction {
    return (url, init) => {
        const response = callback(url, init);
        return Promise.resolve({
            ok: true,
            url: url.href,
            status: 200,
            statusText: 'empty status text',
            redirected: false,
            headers: new Headers(),
            arrayBuffer: () => Promise.reject(new Error('Not available')),
            text: () => Promise.reject(new Error('Not available')),
            json: () => Promise.reject(new Error('Not available')),
            ...response
        });
    }
}

test('Test get request in "/hello/world" → success response', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        fetch: fetchFactory(url => ({
            json: () => Promise.resolve({
                href: url.href,
                foo_bar: 666,
                foo_baz: 999,
            })
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    const json = await legaleFetch.fetchJSON('hello/world');

    t.deepEqual(json, {
        href: 'https://dev.api.legale.io/hello/world',
        fooBar: 666,
        fooBaz: 999,
    });
});

test('Test get request in "/hello/world" → failed response', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: x => x,
        toJSONSnakeCase: x => x,
        fetch: fetchFactory(() => ({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ message: 'Failed request by pendejo' })
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    await t.throwsAsync(
        () => legaleFetch.fetchJSON('hello/world'),
        {
            message: 'Failed request by pendejo',
            instanceOf: FailedFetchResponseError,
        }
    );
});

test('Test get request in "/hello/world" → failed Response.json()', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: x => x,
        toJSONSnakeCase: x => x,
        fetch: fetchFactory(() => ({
            json: () => Promise.reject(new Error('Perreo ijoeputa'))
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    await t.throwsAsync(
        () => legaleFetch.fetchJSON('hello/world'),
        {
            message: `The json fetch response function has failed`,
            instanceOf: FailedFetchResponseError,
        }
    );
});

test('Test get request in "/hello/world" → failed `toJSONCamelCase` function', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: _ => { throw new Error('Perreo ijoeputa') },
        toJSONSnakeCase: x => x,
        fetch: fetchFactory(() => ({
            json: () => Promise.resolve("hola mundo")
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    await t.throwsAsync(
        () => legaleFetch.fetchJSON('hello/world'),
        {
            message: 'The function `toJSONCamelCase` has been failed',
            instanceOf: FailedFetchResponseError,
        }
    );
});

test('Test get request in "/hello/world" → failed `toJSONSnakeCase` function', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: x => x,
        toJSONSnakeCase: _ => { throw new Error('Perreo ijoeputa') },
        fetch: fetchFactory(() => ({
            json: () => Promise.resolve("hola mundo")
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    await t.throwsAsync(
        () => legaleFetch.fetchJSON('hello/world', { query: { foo: 'bar' } }),
        {
            message: 'The function `toJSONSnakeCase` has been failed',
            instanceOf: FailedFetchRequestError,
        }
    );
});

test('Test get request in "/hello/world" → success Buffer capture', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: _ => { throw new Error('Perreo ijoeputa') },
        toJSONSnakeCase: _ => { throw new Error('Perreo ijoeputa') },
        fetch: fetchFactory(() => ({
            arrayBuffer: () => {
                const buffer = Buffer.from('ñeee', 'utf-8');
                const bytes = new Uint8Array(buffer);
                buffer.forEach((x, i) => bytes[i] = x);
                return Promise.resolve(bytes as any);
            }
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    const buffer = await legaleFetch.fetchBuffer('hello/world');
    const text = buffer.toString('utf-8');
    t.is(text, 'ñeee');
});

test('Test get request in "/hello/world" → failed Buffer capture', async t => {
    const inject: LegaleFetchInject = {
        test: true,
        toJSONCamelCase: _ => { throw new Error('Perreo ijoeputa') },
        toJSONSnakeCase: _ => { throw new Error('Perreo ijoeputa') },
        fetch: fetchFactory(() => ({
            arrayBuffer: () => Promise.reject(new Error('caca'))
        }))
    }

    const legaleFetch = new LegaleFetch(inject);
    await t.throwsAsync(
        () => legaleFetch.fetchBuffer('hello/world'),
        {
            message: 'Cannot extract the buffer from response',
            instanceOf: FailedFetchResponseError
        }
    )
});