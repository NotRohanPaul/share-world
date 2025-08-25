import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import { logoutController } from "@src/controllers/auth-controllers";
import { BlockedRefreshTokensModel } from "@src/models/non-core-models";
import express from "express";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import { afterAll, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@src/constants/env";

describe("test for logout controller", () => {
    setupMongoReplicaServer();

    afterAll(async () => {
        await BlockedRefreshTokensModel.deleteMany({});
    });

    it("response 200 with clearCookie headers if the request has no refresh Token", async () => {
        const mockResponse = {
            send: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            clearCookie: vi.fn().mockReturnThis()
        } as unknown as express.Response;

        await logoutController({} as express.Request, mockResponse, vi.fn);

        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.send).toBeCalledWith("Logout successful");
        expect(mockResponse.clearCookie).toBeCalledTimes(2);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(1, "accessToken", COMMON_COOKIE_OPTIONS);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(2, "refreshToken", COMMON_COOKIE_OPTIONS);

    });

    it("response 200 with clearCookie headers if the request has refresh Token", async () => {
        const refreshToken = jwt.sign({ userId: "".padStart(24, '0'), email: "test@test.com" }, JWT_SECRET, { expiresIn: '7d' });

        const mockRequest = {
            signedCookies: {
                refreshToken: refreshToken
            }
        } as unknown as express.Request;

        const mockResponse = {
            send: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            clearCookie: vi.fn().mockReturnThis()
        } as unknown as express.Response;

        await logoutController(mockRequest, mockResponse, vi.fn);

        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.send).toBeCalledWith("Logout successful");
        expect(mockResponse.clearCookie).toBeCalledTimes(2);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(1, "accessToken", COMMON_COOKIE_OPTIONS);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(2, "refreshToken", COMMON_COOKIE_OPTIONS);

        const tokenDoc = await BlockedRefreshTokensModel.find({
            token: refreshToken
        });

        expect(tokenDoc).toHaveLength(1);
        expect(tokenDoc[0].token).toBe(refreshToken);
    });
})


