import { Router } from "express";
import { loginController } from "src/controllers/authController/loginControlller";


const authRouteHandler = Router();

authRouteHandler.post("/login", loginController);
authRouteHandler.get("/logout", () => {
   
});




export {authRouteHandler};

