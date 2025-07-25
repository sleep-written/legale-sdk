import { toJSONSnakeCase } from './to-json-snake-case.js';
import test from 'ava';

test('Object literal', t => {
    const result = toJSONSnakeCase({
        fooBar:     666,
        TypeORM:    777,
        Ñeee:       888,
        _______________: new Date('2025-07-24T19:11:53.954Z')
    });

    t.deepEqual(result, {
        foo_bar:    666,
        type_orm:   777,
        ñeee:       888,
        _:          '2025-07-24T19:11:53.954Z'
    });
});

test('Nested literal', t => {
    const result = toJSONSnakeCase({
        fooBar:     666,
        TypeORM:    777,
        Ñeee:       888,
        ñoÑee:      new Date('2025-07-24T19:11:53.954Z'),
        _______________: {
            PERREOijoeputa:  true,
            ZETApagaLAcoca:  false
        }
    });

    t.deepEqual(result, {
        foo_bar:    666,
        type_orm:   777,
        ñeee:       888,
        ño_ñee:     '2025-07-24T19:11:53.954Z',
        _: {
            perreo_ijoeputa:    true,
            zeta_paga_la_coca:  false
        }
    });
});

test('Object literal array', t => {
    const result = toJSONSnakeCase([
        {
            fooBar:     666,
            TypeORM:    666,
            Ñeee:       666,
            ______:     new Date('2025-07-24T19:16:16.954Z')
        },
        {
            fooBar:     777,
            TypeORM:    777,
            Ñeee:       777,
            ______:     new Date('2025-07-24T19:16:17.954Z')
        },
        {
            fooBar:     888,
            TypeORM:    888,
            Ñeee:       888,
            ______:     new Date('2025-07-24T19:16:18.954Z')
        }
    ]);

    t.deepEqual(result, [
        {
            foo_bar:    666,
            type_orm:   666,
            ñeee:       666,
            _:          '2025-07-24T19:16:16.954Z'
        },
        {
            foo_bar:    777,
            type_orm:   777,
            ñeee:       777,
            _:          '2025-07-24T19:16:17.954Z'
        },
        {
            foo_bar:    888,
            type_orm:   888,
            ñeee:       888,
            _:          '2025-07-24T19:16:18.954Z'
        }
    ]);
});

test('Nested literal array', t => {
    const result = toJSONSnakeCase([
        {
            fooBar:     666,
            TypeORM:    666,
            Ñeee:       666,
            ÑoÑee:      new Date('2025-07-24T19:11:53.954Z'),
            ________:   {
                PERREOijoeputa:  111,
                ZETApagaLAcoca:  111
            }
        },
        {
            fooBar:     777,
            TypeORM:    777,
            Ñeee:       777,
            ÑoÑee:      new Date('2025-07-24T19:12:53.954Z'),
            ________:   {
                PERREOijoeputa:  222,
                ZETApagaLAcoca:  222
            }
        },
        {
            fooBar:     888,
            TypeORM:    888,
            Ñeee:       888,
            ÑoÑee:      new Date('2025-07-24T19:13:53.954Z'),
            ________:   {
                PERREOijoeputa:  333,
                ZETApagaLAcoca:  333
            }
        }
    ]);

    t.deepEqual(result, [
        {
            foo_bar:    666,
            type_orm:   666,
            ñeee:       666,
            ño_ñee:     '2025-07-24T19:11:53.954Z',
            _: {
                perreo_ijoeputa:    111,
                zeta_paga_la_coca:  111
            }
        },
        {
            foo_bar:    777,
            type_orm:   777,
            ñeee:       777,
            ño_ñee:     '2025-07-24T19:12:53.954Z',
            _: {
                perreo_ijoeputa:    222,
                zeta_paga_la_coca:  222
            }
        },
        {
            foo_bar:    888,
            type_orm:   888,
            ñeee:       888,
            ño_ñee:     '2025-07-24T19:13:53.954Z',
            _: {
                perreo_ijoeputa:    333,
                zeta_paga_la_coca:  333
            }
        }
    ]);
});

test('ESM Maps', t => {
    const target = new Map<string, any>();
    target.set('fooBar', 111);
    target.set('fooBak', 666);
    target.set('fooBaz', 999);

    const result = toJSONSnakeCase(target);
    t.deepEqual(result, {
        foo_bar: 111,
        foo_bak: 666,
        foo_baz: 999
    });
});

test('ESM Sets', t => {
    const target = new Set<string>();
    target.add('foo');
    target.add('bar');
    target.add('baz');
    target.add('foo');

    const result = toJSONSnakeCase(target);
    t.deepEqual(result, [ 'foo', 'bar', 'baz' ]);
});