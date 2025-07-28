import { JSONConverter } from './json-converter.js';

const jsonConverter = new JSONConverter({
    normalizeKey: key => key
        .replace(/_{2,}/g, '_')
        .replace(/(^_+|_+$)/g, ''),

    transformKey: key => key
        .replace(
            /((?<=[a-zñ])[A-ZÑ]+|(?<=[A-ZÑ]{2,})[a-zñ])/g,
            (...[ t ]) => '_' + t
                .toLowerCase()
        )
        .toLowerCase(),

    transformValue: v => {
        if (v instanceof Date) {
            return v.toJSON();
        } else {
            return v;
        }
    }
});

export const toJSONSnakeCase = (input: any) => jsonConverter.convert(input);