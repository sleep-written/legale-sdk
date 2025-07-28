export class JSONConverter {
    #normalizeKey?:     (k: string) => string;
    #transformKey?:     (k: string) => string;
    #transformValue?:   (v: any) => any;

    constructor(options?: {
        normalizeKey?:      (k: string) => string;
        transformKey?:      (k: string) => string;
        transformValue?:    (v: any) => any;
    }) {
        this.#normalizeKey =    options?.normalizeKey;
        this.#transformKey =    options?.transformKey;
        this.#transformValue =  options?.transformValue;
    }

    #convert(input: any, cache: Map<string, string>): any {
        const value = this.#transformValue
        ?   this.#transformValue(input)
        :   input;

        if (value !== input) {
            return value;
        }

        if (Array.isArray(value)) {
            return value.map(x => this.#convert(x, cache));
        }

        if (value && typeof value === 'object') {
            const entries = Object
                .entries(value)
                .map(([ k, v ]) => {
                    const value = this.#convert(v, cache);
                    const oldKey = this.#normalizeKey?.(k) ?? k;

                    if (!cache.has(oldKey)) {
                        let newKey = this.#transformKey?.(oldKey) ?? oldKey;
                        if (newKey.length === 0) {
                            newKey = '_';
                        }

                        cache.set(oldKey, newKey);
                        return [ newKey, value ];
                    } else {
                        return [ cache.get(oldKey), value ];
                    }
                });

            return Object.fromEntries(entries);
        }
        
        return value;
    }

    convert(input: any, cache?: Map<string, string>): any {
        if (!cache) { cache = new Map(); }
        return this.#convert(input, cache);
    }
}