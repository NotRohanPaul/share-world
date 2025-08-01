import {
    API_ORIGIN,
    APP_ORIGIN,
    IS_SECURE_ENV,
    WS_API_ORIGIN
} from "@src/constants/env";
import { logRequestsInfoMiddleware } from "@src/middlewares/common/log-requests-info-middleware";
import { mainRouter } from "@src/routes/routes";
import { errorHandler, unknownHandler } from "@src/utils/handlers";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";

const app = express();

app.disable("x-powered-by");
app.use(helmet({
    xPoweredBy: false,
    frameguard: { action: "sameorigin" },
    referrerPolicy: { policy: "no-referrer" },
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: IS_SECURE_ENV ? {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", API_ORIGIN, WS_API_ORIGIN],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            frameAncestors: ["'self'"]
        }
    } : false
}));
app.use(cors({
    origin: IS_SECURE_ENV ? APP_ORIGIN : true,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(logRequestsInfoMiddleware);

app.use("/api/v1", mainRouter);
app.get("*public", (_req, res) => {
    res.set("Cache-Control", "no-store");
    res.sendFile(path.resolve("public/index.html"));
});

app.use(errorHandler);
app.use(unknownHandler);


export { app };

