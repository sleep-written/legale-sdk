export class UnsupportedBodyTypeError extends Error {
    constructor() {
        super('The body request provided isn\'t supported');
    }
}