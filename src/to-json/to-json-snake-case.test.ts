import { toJSONSnakeCase } from './to-json-snake-case.js';
import test from 'ava';

test('Object literal', t => {
    const json = toJSONSnakeCase({
        TypeORM: 0,
        fooBar: 666,
        fooBaz: 777,
        ñee: 888,
        _: 999
    });

    t.deepEqual(json, {
        type_orm: 0,
        foo_bar: 666,
        foo_baz: 777,
        ñee: 888,
        _: 999
    });
});

test('Object literal array', t => {
    const json = toJSONSnakeCase([
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

    t.deepEqual(json, [
        {
            foo_bar: 666,
            foo_baz: 666,
            ñee: 666,
            _: 666
        },
        {
            foo_bar: 777,
            foo_baz: 777,
            ñee: 777,
            _: 777
        }
    ]);
});

test('Nested object literal array', t => {
    const json = toJSONSnakeCase([
        {
            fooBar: 666,
            fooBaz: 666,
            ñee: 666,
            _: {
                old: new Date('2025-01-01T01:00:00.123Z')
            }
        },
        {
            fooBar: 777,
            fooBaz: 777,
            ñee: 777,
            _: {
                old: new Date('2025-01-01T02:00:00.123Z')
            }
        }
    ]);

    t.deepEqual(json, [
        {
            foo_bar: 666,
            foo_baz: 666,
            ñee: 666,
            _: {
                old: '2025-01-01T01:00:00.123Z'
            }
        },
        {
            foo_bar: 777,
            foo_baz: 777,
            ñee: 777,
            _: {
                old: '2025-01-01T02:00:00.123Z'
            }
        }
    ]);
});

