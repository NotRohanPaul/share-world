import express from "express";
import { connectDB } from "./configs/connect-DB";
import { PORT } from "./constants/env";
import { errorHandler } from "./middleware/error-handler";
import { unknownHandler } from "./middleware/unknown-handler";
import { routesHandler } from "./routes/routes";

export const app = express();
app.use(express.json())


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
