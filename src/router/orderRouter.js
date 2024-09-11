import { Router } from 'express';
import cw from '../utils/controllerWrapper.js';
import orderController from '../controllers/orderController.js';

const orderRouter = Router();

// route qui permet de récupérer toutes les commandes passées
orderRouter.get('/', cw(orderController.getAll));

export default orderRouter;