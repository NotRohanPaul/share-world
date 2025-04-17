import express from "express";
import { connectDB } from "./config/connectDB";
import { PORT } from "./config/env";
import { authRouteHandler } from "./routes/authRouteHandler";
import { HTTP_STATUS_CODES } from "./constants/errorCodes";

const app = express();

app.get("/", (_req, res) => {
    res.send("Hello"); 
});

//auth Routes
app.use("/auth", authRouteHandler);

//Unknown Rotes
app.use("*",(_req,res)=>{
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND)
})


void connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening: http://localhost:${PORT}`);
    });
});
