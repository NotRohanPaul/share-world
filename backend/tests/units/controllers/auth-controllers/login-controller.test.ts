import { UserModel } from "@models/users.model";
import { loginController } from "@src/controllers/auth-controllers";
import { createPasswordHash } from "@utils/bcrypt-utils";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";


describe("test loginController", () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create({
            binary: {
                version: "8.0.4"
            }
        });
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("responds with 200 and sets cookies if credentials are valid", async () => {
        const userDoc = await UserModel.create({
            name: "test",
            email: "test@example.com",
            password: "Test@123"
        });

        const mockRequest = {
            body: {
                email: "test@example.com",
                password: "Test@123"
            }
        } as express.Request;

        const mockResponse = {
            cookie: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockImplementation((...args) => {
                console.log("cookie called with:", args);
                return mockResponse;
            }),
        } as unknown as express.Response;
        const mockNext = vi.fn();

        await loginController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({
            name: userDoc.name,
            email: userDoc.email,
        });
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


    it("responds with 400 if password is incorrect", async () => {
        const hashedPassword = await createPasswordHash("Test@123");
        console.log(hashedPassword);
        await UserModel.create({
            name: "test",
            email: "wrongpass@example.com",
            password: hashedPassword
        });

        const mockRequest = {
            body: {
                email: "wrongpass@example.com",
                password: "WrongTest@123"
            }
        } as express.Request;

        const mockResponse = {
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as express.Response;

        await loginController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });


    it("responds with 400 if user does not exist", async () => {
        const mockRequest = {
            body: {
                email: "nonexistent@example.com",
                password: "Test@123"
            }
        } as express.Request;

        const mockResponse = {
            sendStatus: vi.fn().mockReturnThis(),
        } as unknown as express.Response;

        await loginController(mockRequest, mockResponse, vi.fn());

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });

});
