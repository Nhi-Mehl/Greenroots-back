import { Router } from 'express';
import cw from '../utils/controllerWrapper.js';
import orderLineController from '../controllers/orderLineController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';


const orderRouter = Router();

// route qui permet de récupérer toutes les commandes et leurs informations rattachées à une commande identifiée par son ID
orderRouter.get('/:order_id', isLoggedIn, cw(orderLineController.getOneOrderLines));

export default orderRouter;