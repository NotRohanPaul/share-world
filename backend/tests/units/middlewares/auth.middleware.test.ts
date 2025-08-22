import { JWT_SECRET } from "@src/constants/env";
import { authMiddleware } from "@src/middlewares/auth/auth.middleware";
import express, { type Express } from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";

const createTestApp = (accessToken?: string): Express => {
    const app = express();
    app.get(
        "/test-auth",
        (req, _, next) => {
            req.signedCookies = {
                accessToken
            };
            console.log(req.signedCookies);
            next();
        },
        authMiddleware,
        (_, res) => {
            res.status(200).send("Authorized");
        }
    );
    return app;
};

describe("To check auth middleware", () => {
    it("next function runs for users with correct tokens", async () => {
        const validAccessToken = jwt.sign(
            {
                userId: "f".padStart(24, '0'),
                email: "test@test.com"
            },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        const mockRequest = {
            signedCookies: {
                accessToken: validAccessToken,
            },
        } as unknown as express.Request;
        const mockResponse = {
            locals: {}
        } as express.Response;
        const mockNext = vi.fn();

        await authMiddleware(mockRequest, mockResponse, mockNext);
        const responseWithContext = (mockResponse.locals as { context?: { auth: unknown; }; });

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(responseWithContext.context?.auth).toEqual(
            expect.objectContaining({
                userId: "f".padStart(24, "0"),
                email: "test@test.com",
            })
        );
    });

    it("response 200 for users with correct tokens", async () => {
        const validAccessToken = jwt.sign({ userId: "f".padStart(24, '0'), email: "test@test.com" }, JWT_SECRET, { expiresIn: '15m' });
        const app = createTestApp(validAccessToken);

        const res = await request(app)
            .get("/test-auth");

        expect(res.status).toBe(200);
        expect(res.text).toBe("Authorized");
    });

    it("response 401 for users with invalid tokens", async () => {
        const inValidAccessToken = "123";
        const app = createTestApp(inValidAccessToken);

        const res = await request(app)
            .get("/test-auth")
            .set("Cookie", [
                `accessToken=${inValidAccessToken}`,
            ]);

        expect(res.status).toBe(401);
    });

    it("response 401 for users with expired tokens", async () => {
        const validButExpiredAccessToken = jwt.sign({ userId: "f".padStart(24, '0'), email: "test@test.com" }, JWT_SECRET, { expiresIn: '0' });
        const app = createTestApp(validButExpiredAccessToken);

        const res = await request(app)
            .get("/test-auth")
            .set("Cookie", [
                `accessToken=${validButExpiredAccessToken}`,
            ]);

        expect(res.status).toBe(401);
    });

    it("responds 401 when token is missing", async () => {
        const app = createTestApp();

        const res = await request(app).get("/test-auth");

        expect(res.status).toBe(401);
    });

});