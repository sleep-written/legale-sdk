export class FailedLoginError extends Error {
    constructor(cause?: Error) {
        super('Failed to login into Legale', { cause });
    }
}