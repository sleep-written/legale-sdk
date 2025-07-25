export class FailedFetchResponseError extends Error {
    #status: number;
    get status(): number {
        return this.#status;
    }

    constructor(status: number, message?: string, cause?: Error) {
        super(message, { cause });
        this.#status = status;
    }
}