import { Router } from "express";
import userController from "../controllers/userController.js";
import cw from "../utils/controllerWrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const userRouter = Router();

// Permet de récupérer les informations personnelles lorsque l'utilisateurs est sur son compte
userRouter.get("/:id", isLoggedIn, cw(userController.getOne));

// Permet de modifier les informations à un utilisateur sur son compte

userRouter.put("/:id", isLoggedIn, cw(userController.updateUser));

export default userRouter;
