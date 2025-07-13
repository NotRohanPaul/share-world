import { JwtPayload } from "@src/schemas/auth-schemas";

declare global {
    namespace Express {
        interface Response {
            context: {
                auth?: z.infer<typeof JwtPayload>;
            };
        }
    }
}
