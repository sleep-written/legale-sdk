const keyCache = new Map<string, string>();

export function toJSONSnakeCase(input: any): any {
    switch (true) {
        case input == null:
        case typeof input === 'undefined': {
            return input;
        }

        case input instanceof Date: {
            return input.toJSON();
        }

        case input instanceof Array: {
            return input.map(x => toJSONSnakeCase(x));
        }

        case input instanceof Set: {
            return Array
                .from(input)
                .map(x => toJSONSnakeCase(x));
        }

        case input instanceof Map: {
            const entries = Array.from(input.entries());
            const target = Object.fromEntries(entries);
            return toJSONSnakeCase(target);
        }

        case typeof input === 'object': {
            const entries = Object
                .entries(input)
                .map(([ k, v ]) => {
                    const value = toJSONSnakeCase(v);
                    const keyOld = k.replace(/_+/g, '');

                    if (keyCache.has(keyOld)) {
                        return [ keyCache.get(keyOld), value ];
                    }

                    let keyNew = keyOld
                        .replace(
                            /((?<=[a-zñ])[A-ZÑ]+|(?<=[A-ZÑ]{2,})[a-zñ])/g,
                            (...[ t ]) => '_' + t
                                .toLowerCase()
                        )
                        .toLowerCase();

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