export class FailedFetchRequestError extends Error {
    constructor(message?: string, cause?: Error) {
        super(message, { cause });
    }
}