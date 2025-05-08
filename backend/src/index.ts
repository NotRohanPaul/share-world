import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB } from "./configs/connect-DB";
import { APP_URL, PORT } from "./constants/env";
import { errorHandler } from "./middleware/error-handler";
import { unknownHandler } from "./middleware/unknown-handler";
import { routesHandler } from "./routes/routes";
import helmet from "helmet";
import cors from "cors";

export const app = express();

app.disable('x-powered-by');
app.use(helmet({
    xFrameOptions: { action: "sameorigin" },
}));
app.use(express.json());
app.use(cors({
    origin: APP_URL,
    credentials: true,
}));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));
app.use("/api/v1", routesHandler);

app.get('/*public', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.resolve('public/index.html'));
});


app.use(errorHandler);

app.use(unknownHandler);

void connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening: http://localhost:${PORT}`);
    });
});
