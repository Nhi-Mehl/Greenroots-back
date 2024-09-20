import { Sequelize } from "sequelize";
import { Order, Order_line, Project_tree, Species } from "../models/index.js";

const orderController = {
  // controller pour récupérer toutes les commandes de la BDD

  async getAll(req, res) {
    const orders = await Order.findAll({
      order: [["id", "ASC"]],
    });
    res.json(orders);
  },

  // Permet de récupérer tous les orders d'un utilisateur

  async getAllUserOrders(req, res) {
    console.log(req.user);

    const userOrders = await Order.findAll({
      where: { user_id: req.user.id },
      order: [["created_at", "ASC"]],
    });

    console.log(userOrders);

    userOrders.forEach((order) => {
      if (order.user_id !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not allowed to see this order" });
      }
    });

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.json(userOrders);
  },

  // Permet de créer un order avec ses order_lines

  async createOrder(req, res) {
    const { amount, orderLine } = req.body;

    const newOrder = await Order.create({
      user_id: req.user.id,
      amount: amount,
    });

    // const projecTree = orderLine.forEach(async (line) => {
    //   const project_tree = await Project_tree.findByPk(line.project_tree_id);

    //   return project_tree;
    // });

    // console.log("projecTree", projecTree);

    // const specie = await Species.findByPk(projecTree.species_id);

    // console.log("specie", specie);

    // console.log("orderLine", orderLine);

    const newOrderLines = await Promise.all(
      orderLine.map(async (line) => {
        const totalAmount = line.quantity * line.amount;

        return await Order_line.create({
          order_id: newOrder.id,
          project_tree_id: line.project_tree_id,
          quantity: line.quantity,
          amount: totalAmount,
        });
      })
    );

    return res
      .status(201)
      .json({ message: "Order created successfully", newOrder, newOrderLines });
  },
};

export default orderController;
