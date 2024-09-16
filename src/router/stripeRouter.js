import { Router } from 'express';
import stripeController from '../controllers/stripeController.js';
import cw from '../utils/controllerWrapper.js'
import isLoggedIn from '../middlewares/isLoggedIn.js';

const stripeRouter = Router();


// Route qui permet d'effectuer le paiement
projectTreeRouter.get('/charge', isLoggedIn, cw(stripeController.stripe));


export default stripeRouter;