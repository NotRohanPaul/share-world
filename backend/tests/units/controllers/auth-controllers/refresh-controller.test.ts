import { describe, expect, it, vi, } from "vitest";
import express from "express";
import { refreshController } from "@src/controllers/auth-controllers/refresh-controller";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@src/constants/env";

describe("tests for refresh controller", () => {

    it("response 200 if the tokens are valid", async () => {
        const validResponseToken = jwt.sign(
            {
                userId: "f".padStart(24, "0"),
                email: "test@test.com"
            },
            JWT_SECRET,
            { expiresIn: 7 * 24 * 60 * 60 * 1000, }
        );

        const mockRequest = {
            cookies: {
                refreshToken: validResponseToken
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
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            }
        );
    });

    it("response 401 for users with invalid tokens", async () => {
        const inValidResponseToken = "123";

        const mockRequest = {
            cookies: {
                refreshToken: inValidResponseToken
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
            cookies: {
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
            cookies: {}
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