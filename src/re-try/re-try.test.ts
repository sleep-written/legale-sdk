import { reTry } from './re-try.js';
import test from 'ava';

test('Try and success (1 attempt, 0 retries)', async t => {
    let attempts = 0;
    const callback = () => {
        attempts++;
        return Promise.resolve(666);
    };

    const result = await reTry(0, callback);

    t.is(attempts, 1);
    t.is(result, 666);
});

test('Try and fail (1 attempt, 0 retries)', async t => {
    let attempts = 0;
    const callback = () => {
        attempts++;
        return Promise.reject(new Error('caca'));
    };

    await t.throwsAsync(
        () => reTry(0, callback),
        { message: 'caca' }
    );

    t.is(attempts, 1);
});

test('Try and success (1 attempt, 3 retries)', async t => {
    let attempts = 0;
    const callback = () => {
        attempts++;
        return Promise.resolve(666);
    };

    const result = await reTry(3, callback);

    t.is(attempts, 1);
    t.is(result, 666);
});

test('Try and success (3 attempts, 10 retries)', async t => {
    let attempts = 0;
    const callback = () => {
        if (++attempts >= 3) {
            return Promise.resolve(666);
        } else {
            const error = new Error('caca');
            return Promise.reject(error);
        }
    };

    const result = await reTry(10, callback);

    t.is(attempts, 3);
    t.is(result, 666);
});

test('Try and fail (3 attempts, 3 retries)', async t => {
    let attempts = 0;
    const callback = () => {
        attempts++;
        const error = new Error('caca');
        return Promise.reject(error);
    };

    await t.throwsAsync(
        () => reTry(3, callback),
        { message: 'caca' }
    );

    t.is(attempts, 3);
});