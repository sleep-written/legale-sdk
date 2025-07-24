import { LegaleFetch } from './legale-fetch.js';
import test from 'ava';

test('Test with dummyjson', async t => {
    const legaleFetch = new LegaleFetch();
    const json = await legaleFetch.fetchJSON('https://dummyjson.com/test');
    t.deepEqual(json, {
        status: 'ok',
        method: 'GET'
    });
});
