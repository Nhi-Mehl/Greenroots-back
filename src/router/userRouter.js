import { Router } from "express";
import userController from "../controllers/userController.js";
import cw from "../utils/controllerWrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const userRouter = Router();

// Permet de récupérer les informations personnelles lorsque l'utilisateurs est sur son compte
userRouter.get("/users/:id", isLoggedIn, cw(userController.getOne));

export default userRouter;
