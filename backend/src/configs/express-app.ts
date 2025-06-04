import { errorHandler } from "@middleware/error-handler";
import { unknownHandler } from "@middleware/unknown-handler";
import { routesHandler } from "@routes/routes";
import { API_ORIGIN, APP_ORIGIN } from "@src/constants/env";
import { isSecureEnv } from "@src/utils/common";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";

const app = express();

app.disable('x-powered-by');
app.use(helmet({
    frameguard: { action: "sameorigin" },
    contentSecurityPolicy: isSecureEnv() ? {
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
app.use(express.json());
app.use(cors({
    origin: isSecureEnv() ? APP_ORIGIN : true,
    credentials: true,
}));

app.use(express.static('public'));
app.use("/api/v1", routesHandler);
app.get("*public", (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.resolve('public/index.html'));
});
app.use(errorHandler);
app.use(unknownHandler);


export { app };

