import { toJSONCamelCase } from './to-json-camel-case.js';
import test from 'ava';

test('Object literal', t => {
    const json = toJSONCamelCase({
        foo_bar: 666,
        FOO_BAZ: 777,
        __ñee__: 888,
        _______: 999
    });

    t.deepEqual(json, {
        fooBar: 666,
        fooBaz: 777,
        ñee: 888,
        _: 999
    });
});

test('Object literal array', t => {
    const json = toJSONCamelCase([
        {
            foo_bar: 666,
            FOO_BAZ: 666,
            __ñee__: 666,
            _______: 666
        },
        {
            foo_bar: 777,
            FOO_BAZ: 777,
            __ñee__: 777,
            _______: 777
        }
    ]);

    t.deepEqual(json, [
        {
            fooBar: 666,
            fooBaz: 666,
            ñee: 666,
            _: 666
        },
        {
            fooBar: 777,
            fooBaz: 777,
            ñee: 777,
            _: 777
        }
    ]);
});

test('Nested object literal array', t => {
    const json = toJSONCamelCase([
        {
            foo_bar: 666,
            FOO_BAZ: 666,
            __ñee__: 666,
            _______: {
                new: '2025-01-01T01:00:00.123Z',
            }
        },
        {
            foo_bar: 777,
            FOO_BAZ: 777,
            __ñee__: 777,
            _______: {
                new: '2025-01-01T02:00:00.123Z',
            }
        }
    ]);

    t.deepEqual(json, [
        {
            fooBar: 666,
            fooBaz: 666,
            ñee: 666,
            _: {
                new: new Date('2025-01-01T01:00:00.123Z')
            }
        },
        {
            fooBar: 777,
            fooBaz: 777,
            ñee: 777,
            _: {
                new: new Date('2025-01-01T02:00:00.123Z')
            }
        }
    ]);
});