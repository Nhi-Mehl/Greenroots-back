import { Order } from '../models/index.js';

const orderController = {
    // controller pour récupérer toutes les commandes de la BDD

    async getAll(req, res) {
        const orders = await Order.findAll({
            order: [['id', 'ASC']],
        });
        res.json(orders);
    },

    // Permet de récupérer tous les orders d'un utilisateur

    async getAllUserOrders(req, res) {
        console.log(req.user)

        const userOrders = await Order.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'ASC']]
        });
        if(userOrders.user_id !== req.user.id) {
            return res.status(403).json({ message: 'You are not allowed to see this order'});
        };
        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
    }
};

export default orderController;