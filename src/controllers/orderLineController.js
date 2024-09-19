import { Order_line } from '../models/index.js';

const orderLineController = {
    // controller qui permet de récupérer toutes les lignes de commandes et leurs informations rattachées à une commande identifiée par son ID
    async getOneOrderLines(req, res) {
        const orderId = Number(req.params.order_id);

        const orderLines = await Order_line.findAll({
            order: [["id", "ASC"]],
            where: {
                order_id: orderId,
            },
            include: [
                {
                    association: "project_tree",
                    include: [
                        {
                            association: "species",
                        },
                    ],
                },
            ],
        });

        // Log les données récupérées pour débogage
        console.log("Order Lines:", orderLines);
        console.log("Requested Order ID:", orderId);

        if (!orderLines || orderLines.length === 0) {
            res.json(orderLines);
            console.log(orderLines);
        }

        orderLines.forEach((line) => {
            if (line.order_id !== orderId) {
                return res
                    .status(403)
                    .json({ message: "You are not allowed to see this order" });
            }
        });



        return res.json(orderLines);
    },
};


export default orderLineController;