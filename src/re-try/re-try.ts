export async function reTry<T>(retries: number, callback: () => Promise<T>): Promise<T> {
    retries = Math.trunc(retries);
    if (retries < 0) {
        retries = Math.abs(retries);
    }

    let attempts = 0;
    while (true) {
        try {
            const r = await callback();
            return r;

        } catch (err) {
            if (++attempts > retries) {
                throw err;
            }
        }
    }
}