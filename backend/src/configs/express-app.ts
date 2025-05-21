import { APP_URL } from "@src/constants/env";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";
import { errorHandler } from "@middleware/error-handler";
import { unknownHandler } from "@middleware/unknown-handler";
import { routesHandler } from "@routes/routes";

const app = express();

app.disable('x-powered-by');
app.use(helmet({
    xFrameOptions: { action: "sameorigin" },
}));
app.use(express.json());
app.use(cors({
    origin: APP_URL,
    credentials: true,
}));
console.log(import.meta.dirname);
app.use(express.static(path.resolve('public/index.html')));

app.use("/api/v1", routesHandler);

app.get("*public", (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.resolve('public/index.html'));
});


app.use(errorHandler);

app.use(unknownHandler);


export { app };
