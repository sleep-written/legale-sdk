const dateISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
const keyCache = new Map<string, string>();

export function toJSONCamelCase(input: any): any {
    switch (true) {
        case input == null:
        case typeof input === 'undefined': {
            return input;
        }

        case typeof input === 'string': {
            if (dateISO.test(input)) {
                return new Date(input);
            } else {
                return input;
            }
        }

        case input instanceof Array: {
            return input.map(x => toJSONCamelCase(x));
        }

        case input instanceof Set: {
            return Array
                .from(input)
                .map(x => toJSONCamelCase(x));
        }

        case input instanceof Map: {
            const entries = Array.from(input.entries());
            const target = Object.fromEntries(entries);
            return toJSONCamelCase(target);
        }

        case typeof input === 'object': {
            const entries = Object
                .entries(input)
                .map(([ k, v ]) => {
                    const value = toJSONCamelCase(v);
                    const keyOld = k
                        .replace(/(^_+|_+$)/gi, '')
                        .replace(/_+/gi, '_')
                        .toLowerCase();

                    if (keyCache.has(keyOld)) {
                        return [ keyCache.get(keyOld), value ];
                    }

                    let keyNew = keyOld.replace(
                        /_+[a-zñ]/gi,
                        (...[ t ]) => t
                            .slice(-1)
                            .toUpperCase()
                    );

                    if (keyNew.length === 0) {
                        keyNew = '_';
                    }

                    keyCache.set(keyOld, keyNew);
                    return [ keyNew, value ];
                });


            return Object.fromEntries(entries);
        }

        default: {
            return input;
        }
    }
}