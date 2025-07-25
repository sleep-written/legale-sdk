import { toJSONCamelCase } from './to-json-camel-case.js';
import test from 'ava';

test('Object literal', t => {
    const result = toJSONCamelCase({
        ___foo___bar___: 666,
        hola______mundo: 777,
        ___________ñeee: 888,
        _______________: '2025-07-24T19:11:53.954Z'
    });

    t.deepEqual(result, {
        fooBar:     666,
        holaMundo:  777,
        ñeee:       888,
        _:          new Date('2025-07-24T19:11:53.954Z')
    });
});

test('Nested literal', t => {
    const result = toJSONCamelCase({
        ___foo___bar___: 666,
        hola______mundo: 777,
        ___________ñeee: 888,
        __ño__ñE_______: '2025-07-24T19:11:53.954Z',
        _______________: {
            PERreo_ijoeputa:    true,
            ZETa_paga_la_coca:  false
        }
    });

    t.deepEqual(result, {
        fooBar:     666,
        holaMundo:  777,
        ñeee:       888,
        ñoÑe:       new Date('2025-07-24T19:11:53.954Z'),
        _: {
            perreoIjoeputa: true,
            zetaPagaLaCoca: false
        }
    });
});

test('Object literal array', t => {
    const result = toJSONCamelCase([
        {
            ___foo___bar___: 666,
            hola______mundo: 666,
            ___________ñeee: 666,
            _______________: '2025-07-24T19:11:53.954Z'
        },
        {
            ___foo___bar___: 777,
            hola______mundo: 777,
            ___________ñeee: 777,
            _______________: '2025-07-24T19:12:53.954Z'
        },
        {
            ___foo___bar___: 888,
            hola______mundo: 888,
            ___________ñeee: 888,
            _______________: '2025-07-24T19:13:53.954Z'
        }
    ]);

    t.deepEqual(result, [
        {
            fooBar:     666,
            holaMundo:  666,
            ñeee:       666,
            _:          new Date('2025-07-24T19:11:53.954Z')
        },
        {
            fooBar:     777,
            holaMundo:  777,
            ñeee:       777,
            _:          new Date('2025-07-24T19:12:53.954Z')
        },
        {
            fooBar:     888,
            holaMundo:  888,
            ñeee:       888,
            _:          new Date('2025-07-24T19:13:53.954Z')
        }
    ]);
});

test('Nested literal array', t => {
    const result = toJSONCamelCase([
        {
            ___foo___bar___: 666,
            hola______mundo: 666,
            ___________ñeee: 666,
            __ño__ñE_______: '2025-07-24T19:11:53.954Z',
            _______________: {
                PERreo_ijoeputa:    111,
                ZETa_paga_la_coca:  111
            }
        },
        {
            ___foo___bar___: 777,
            hola______mundo: 777,
            ___________ñeee: 777,
            __ño__ñE_______: '2025-07-24T19:12:53.954Z',
            _______________: {
                PERreo_ijoeputa:    222,
                ZETa_paga_la_coca:  222
            }
        },
        {
            ___foo___bar___: 888,
            hola______mundo: 888,
            ___________ñeee: 888,
            __ño__ñE_______: '2025-07-24T19:13:53.954Z',
            _______________: {
                PERreo_ijoeputa:    333,
                ZETa_paga_la_coca:  333
            }
        }
    ]);

    t.deepEqual(result, [
        {
            fooBar:     666,
            holaMundo:  666,
            ñeee:       666,
            ñoÑe:       new Date('2025-07-24T19:11:53.954Z'),
            _: {
                perreoIjoeputa: 111,
                zetaPagaLaCoca: 111
            }
        },
        {
            fooBar:     777,
            holaMundo:  777,
            ñeee:       777,
            ñoÑe:       new Date('2025-07-24T19:12:53.954Z'),
            _: {
                perreoIjoeputa: 222,
                zetaPagaLaCoca: 222
            }
        },
        {
            fooBar:     888,
            holaMundo:  888,
            ñeee:       888,
            ñoÑe:       new Date('2025-07-24T19:13:53.954Z'),
            _: {
                perreoIjoeputa: 333,
                zetaPagaLaCoca: 333
            }
        }
    ]);
});

test('ESM Maps', t => {
    const target = new Map<string, any>();
    target.set('_________foo_bar', 111);
    target.set('__foo______bak__', 666);
    target.set('foo_baz_________', 999);

    const result = toJSONCamelCase(target);
    t.deepEqual(result, {
        fooBar: 111,
        fooBak: 666,
        fooBaz: 999
    });
});

test('ESM Sets', t => {
    const target = new Set<string>();
    target.add('foo');
    target.add('bar');
    target.add('baz');
    target.add('foo');

    const result = toJSONCamelCase(target);
    t.deepEqual(result, [ 'foo', 'bar', 'baz' ]);
});