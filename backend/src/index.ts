import express from "express";
import { connectDB } from "./configs/connectDB";
import { PORT } from "./constants/env";
import { errorHandler } from "./middleware/errorHandler";
import { unknownHandler } from "./middleware/unknownHandler";
import { routesHandler } from "./routes/routes";

export const app = express();

app.get("/", (_req, res) => {
    res.send("Welcome to Share World");
});

app.use("/api", routesHandler);

app.use(errorHandler);

app.use(unknownHandler);

void connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening: http://localhost:${PORT}`);
    });
});
