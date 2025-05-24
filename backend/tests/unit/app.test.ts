import request from "supertest";
import { app } from "@src/configs/express-app";
import { describe, it, expect } from "vitest";

describe("GET /api/v1", () => {
    it("status 200", async () => {
        const res = 5;

        expect(res).toBe(5);
    });
    it("status 200", async () => {
        await request(app)
            .get("/api/v1")
            .expect(200);
    });
});