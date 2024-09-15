import { Router } from 'express';
import cw from '../utils/controllerWrapper.js';
import orderController from '../controllers/orderController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const orderRouter = Router();

// route qui permet de récupérer toutes les commandes passées
orderRouter.get('/', cw(orderController.getAll));

// Route qui permet de créer une commande avec ses lignes de commandes rattachées à un utilisateur
orderRouter.post('/create_order', isLoggedIn, cw(orderController.createOrder));

// route pour récupérer toutes les commandes d'un utilisateur
orderRouter.get('/:user_id', isLoggedIn, cw(orderController.getAllUserOrders));

export default orderRouter;