import { errorHandler } from "@middlewares/error-handler";
import { unknownHandler } from "@middlewares/unknown-handler";
import { routesHandler } from "@routes/routes";
import { API_ORIGIN, APP_ORIGIN, IS_SECURE_ENV } from "@src/constants/env";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";

const app = express();

app.disable('x-powered-by');
app.use(helmet({
    xPoweredBy: false,
    frameguard: { action: "sameorigin" },
    referrerPolicy: { policy: "no-referrer" },
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: IS_SECURE_ENV ? {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", API_ORIGIN],
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

app.use(express.json());
app.use(express.static('public'));

app.use("/api/v1", routesHandler);
app.get("*public", (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.resolve('public/index.html'));
});
app.use(errorHandler);
app.use(unknownHandler);


export { app };

