import { describe, expect, it, vi, } from "vitest";
import express from "express";
import { refreshController } from "@src/controllers/auth-controllers/refresh.controller";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@src/constants/env";
import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import { BlockedRefreshTokensModel } from "@src/models/non-core-models";

describe("tests for refresh controller", () => {
    setupMongoReplicaServer();

    it("response 200 if the refresh token is valid", async () => {
        const validRefreshToken = jwt.sign(
            {
                userId: "f".padStart(24, "0"),
                email: "test@test.com"
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        const mockRequest = {
            signedCookies: {
                refreshToken: validRefreshToken
            }
        } as unknown as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;


        await refreshController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toBeCalledWith(200);
        expect(mockResponse.cookie).toBeCalledWith(
            "accessToken",
            expect.any(String),
            {
                ...COMMON_COOKIE_OPTIONS,
                maxAge: 15 * 60 * 1000,
            }
        );
    });

    it("response 401 if the token is blocked already", async () => {

        const validRefreshToken = jwt.sign(
            {
                userId: "f".padStart(24, "0"),
                email: "test@test.com"
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        await BlockedRefreshTokensModel.create({
            token: validRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 1000)
        });

        const mockRequest = {
            signedCookies: {
                refreshToken: validRefreshToken
            }
        } as unknown as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;


        await refreshController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toBeCalledWith(401);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });

    it("response 401 for users with invalid tokens", async () => {
        const invalidRefreshToken = "123";

        const mockRequest = {
            signedCookies: {
                refreshToken: invalidRefreshToken
            }
        } as unknown as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;


        await refreshController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toBeCalledWith(401);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });

    it("response 401 for users with expired tokens", async () => {
        const validButExpiredRefreshToken = jwt.sign(
            {
                userId: "f".padStart(24, '0'),
                email: "test@test.com"
            },
            JWT_SECRET,
            { expiresIn: '0' }
        );

        const mockRequest = {
            signedCookies: {
                refreshToken: validButExpiredRefreshToken
            }
        } as unknown as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;


        await refreshController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toBeCalledWith(401);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });

    it("responds 401 when token is missing", async () => {
        const mockRequest = {
            signedCookies: {}
        } as unknown as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;

        await refreshController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toBeCalledWith(401);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });
});