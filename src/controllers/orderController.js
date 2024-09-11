import { Order } from '../models/index.js';

const orderController = {
    // controller pour récupérer toutes les commandes de la BDD

    async getAll(req, res) {
        const orders = await Order.findAll({
            order: [['id', 'ASC']],
        });
        res.json(orders);
    },
};

export default orderController;