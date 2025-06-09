import { timeoutHandler } from "@src/middleware/timeout-handler";
import express, { type Express, type ErrorRequestHandler } from "express";
import request from "supertest";
import { describe, it } from "vitest";

export const appWithTimeout = (setupRoutes: (app: express.Express) => void): Express => {
    const app = express();

    setupRoutes(app);

    const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
        console.log("Error handler triggered");
        if (err instanceof Error) {
            console.log("Message: ", err.message);
        }
        res.sendStatus(500);
    };

    app.use(errorHandler);

    return app;
};


describe("Timeout middleware", () => {

    it("returns 500 for invalid timeout duration input", async () => {
        const app = appWithTimeout(app => {
            app.get("/invalid", timeoutHandler(100), (_req, res) => {
                res.send("should not get here");
            });
        });

        await request(app).get("/invalid").expect(500);
    });

    it("returns 200 when times out is respected", async () => {
        const app = appWithTimeout(app => {
            app.get("/fast", timeoutHandler(1_000), async (_req, res) => {
                await new Promise(resolve => setTimeout(resolve, 200));
                res.send("done");
            });
        });

        await request(app).get("/fast").expect(200);
    });

    it("returns error when request times out", async () => {
        const app = appWithTimeout(app => {
            app.get("/slow", timeoutHandler(1_000), async (_req, res) => {
                await new Promise(resolve => setTimeout(resolve, 2_000));

                res.send("done");
            });
        });

        await request(app).get("/slow").expect(500);
    });

});
