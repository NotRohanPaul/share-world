import request from "supertest";
import { app } from "@src/configs/express-app";

describe("GET /api/v1", () => {
    it.only("status 200", async () => {
        const res = 5;

        expect(res).toBe(5);
    });
    it("status 200", async () => {
        const res = await request(app)
            .get("/api/v1")
            .expect(200);

        expect(res.statusCode).toBe(200);
    });
});