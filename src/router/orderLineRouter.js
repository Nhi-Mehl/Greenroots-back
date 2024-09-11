import { Router } from 'express';
import cw from '../utils/controllerWrapper.js';
import orderLineController from '../controllers/orderLineController.js';

const orderRouter = Router();

// route qui permet de récupérer toutes les commandes et leurs informations rattachées à une commande identifiée par son ID
orderRouter.get('/:order_id', cw(orderLineController.getOneOrderLines));

export default orderRouter;