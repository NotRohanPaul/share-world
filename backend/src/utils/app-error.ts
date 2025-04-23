/* import assert from "node:assert/strict";

export class AppError extends Error {
    type: string;
    code: number | undefined;

    constructor(err: unknown, message?: string, code?: number) {
        super(message || "some app error");
        this.code = code;
        this.type = "app_error";
        this.name = this.constructor.name;
        if (err instanceof Error && err.stack) {
            this.stack = err.stack;
        }
    }
}

export const appError = (
    condition: boolean,
    message?: string,
    code?: number
): asserts condition => {
    try {
        assert(condition, message);
    } catch (err) {
        throw new AppError(err, message, code);
    }
};
 */