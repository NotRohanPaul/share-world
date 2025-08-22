import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import { logoutController } from "@src/controllers/auth-controllers";
import express from "express";
import { describe, expect, it, vi } from "vitest";

describe("test for logout controller", () => {
    it("response 200 with clearCookie headers ", () => {

        const mockResponse = {
            send: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            clearCookie: vi.fn().mockReturnThis()
        } as unknown as express.Response;

        void logoutController({} as express.Request, mockResponse, vi.fn);

        expect(mockResponse.send).toBeCalledWith("Logout successful");
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.clearCookie).toBeCalledTimes(2);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(1, "accessToken", COMMON_COOKIE_OPTIONS);
        expect(mockResponse.clearCookie).toHaveBeenNthCalledWith(2, "refreshToken", COMMON_COOKIE_OPTIONS);

    });

})


