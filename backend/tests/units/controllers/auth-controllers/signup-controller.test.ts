import { signupController } from "@src/controllers/auth-controllers";
import { UserModel } from "@src/models/users.model";
import { comparePasswordHash } from "@src/utils/bcrypt-utils";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongodbMemoryOptions } from "tests/configs/helpers/common";
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi
} from "vitest";


describe("to test signupController", () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create(MongodbMemoryOptions);
        await mongoose.connect(mongoServer.getUri());
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("response 200 for valid body", async () => {
        const testInputs = {
            name: "Test",
            email: "test@test.com",
            password: "Test@123",
        };

        const mockRequest = {
            body: {
                name: testInputs.name,
                email: testInputs.email,
                password: testInputs.password,
                confirmPassword: testInputs.password
            }
        } as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as express.Response;

        await signupController(mockRequest, mockResponse, vi.fn());

        const userDoc = await UserModel.find({ email: testInputs.email });
        const isSame = await comparePasswordHash(testInputs.password, userDoc[0].password);

        expect(userDoc.length).toBe(1);
        expect(userDoc[0].name).toBe(testInputs.name);
        expect(userDoc[0].email).toBe(testInputs.email);
        expect(isSame).toBe(true);
        expect(mockResponse.send).toBeCalledWith({
            name: userDoc[0].name,
            email: userDoc[0].email
        });
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.cookie).toHaveBeenCalledWith(
            "accessToken",
            expect.any(String),
            expect.objectContaining({
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            })
        );
        expect(mockResponse.cookie).toHaveBeenCalledWith(
            "refreshToken",
            expect.any(String),
            expect.objectContaining({
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
        );
    });

    it("response 400 for invalid email", async () => {
        const testInputs = {
            name: "Test",
            email: "wrongEmail",
            password: "Test@123",
        };

        const mockRequest = {
            body: {
                name: testInputs.name,
                email: testInputs.email,
                password: testInputs.password,
                confirmPassword: testInputs.password
            }
        } as express.Request;

        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as express.Response;

        await signupController(mockRequest, mockResponse, vi.fn());

        const userDoc = await UserModel.find({ email: testInputs.email });

        expect(userDoc.length).toBe(0);
        expect(mockResponse.sendStatus).toBeCalledWith(400);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });


    it("response 400 for invalid password", async () => {
        const testInputs = {
            name: "Test",
            email: "wrongEmail",
            password: "basic-password",
        };

        const mockRequest = {
            body: {
                name: testInputs.name,
                email: testInputs.email,
                password: testInputs.password,
                confirmPassword: testInputs.password
            }
        } as express.Request;
        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as express.Response;

        await signupController(mockRequest, mockResponse, vi.fn());

        const userDoc = await UserModel.find({ email: testInputs.email });

        expect(userDoc.length).toBe(0);
        expect(mockResponse.sendStatus).toBeCalledWith(400);
        expect(mockResponse.cookie).toBeCalledTimes(0);
    });
});
