import type { RequestHandler } from "express";
import type { z } from "zod";
import type { jwtPayloadStrictSchema } from "@src/schemas/auth-schemas";

export type HandlerGenerics = Partial<{
    context: Record<string, unknown>;
    params: unknown;
    resBody: unknown;
    reqBody: unknown;
    reqQuery: unknown;
    locals: Record<string, unknown>;
}>;

export type BaseHandlerType<
    G extends HandlerGenerics,
    ContextExtension
> = RequestHandler<
    G["params"] extends undefined ? unknown : G["params"],
    G["resBody"] extends undefined ? unknown : G["resBody"],
    G["reqBody"] extends undefined ? unknown : G["reqBody"],
    G["reqQuery"] extends undefined ? unknown : G["reqQuery"],
    (G["locals"] extends undefined ? Record<string, unknown> : G["locals"]) & {
        context?: (G["context"] extends undefined ? Record<string, unknown> : Partial<G["context"]>) & ContextExtension;
    }
>;


export type ContextHandlerType<
    G extends HandlerGenerics = HandlerGenerics
> = BaseHandlerType<G, Record<string, unknown>>;

export type AuthContextHandlerType<
    G extends HandlerGenerics = HandlerGenerics
> = BaseHandlerType<
    G,
    { auth?: z.infer<typeof jwtPayloadStrictSchema>; }
>;
