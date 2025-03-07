import { Router } from "express";
import stripeController from "../controllers/stripeController.js";
import cw from "../utils/controllerWrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const stripeRouter = Router();

// Route qui permet d'effectuer le paiement
stripeRouter.post("/charge", isLoggedIn, cw(stripeController.stripe));

// Route qui permet de récupérer le client secret
stripeRouter.post(
  "/create_payment_intent",
  isLoggedIn,
  cw(stripeController.getClientSecretStripe)
);

export default stripeRouter;
