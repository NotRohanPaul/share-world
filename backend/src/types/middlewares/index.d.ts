import { JwtPayload } from "@src/schemas/auth-schemas";

declare global {
    namespace Express {
        interface Request {
            context?: {
                auth?: z.infer<typeof JwtPayload>;
            };
        }
    }
}
