import { JSONConverter } from './json-converter.js';

const dateISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,})?Z$/;
const jsonConverter = new JSONConverter({
    normalizeKey: key => key
        .replace(/_{2,}/g, '_')
        .replace(/(^_+|_+$)/g, '')
        .toLowerCase(),

    transformKey: key => key.replace(
        /_+[a-zñ]/gi,
        (...[ t ]) => t
            .replace(/_+/g, '')
            .toUpperCase()
    ),

    transformValue: v => {
        if (typeof v === 'string' && dateISO.test(v)) {
            return new Date(v);
        } else {
            return v;
        }
    }
});

export const toJSONCamelCase = (input: any) => jsonConverter.convert(input);