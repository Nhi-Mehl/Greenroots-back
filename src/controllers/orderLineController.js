import { z } from 'zod';
import { Order_line } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

const orderLineController = {
    // controller qui permet de récupérer toutes les lignes de commandes et leurs informations rattachées à une commande identifiée par son ID
    async getOneOrderLines(req, res) {
        const orderLines = await Order_line.findAll({
            order: [['id', 'ASC']],
            where: {
                order_id: req.params.order_id,
            },
            include: [
                {
                    association: 'project_tree',
                    include: [
                        {
                            association: 'species',
                        }
                    ]
                }
            ],
        });
        res.json(orderLines);
        console.log(orderLines);
    }
}

export default orderLineController;