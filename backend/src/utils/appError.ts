export class AppError extends Error {
    type: string;
    code: undefined | number;
    constructor(err: unknown, code?: number) {
        super(err instanceof Error
            ? err.message
            : String(err)
        );
        this.code = code;
        this.type = "app_error";
        this.name = this.constructor.name;
    }
}
