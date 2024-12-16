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

    // const projectTrees = await Promise.all(
    //   orderLine.map(async (line) => {
    //     return await Project_tree.findByPk(line.project_tree_id);
    //   })
    // );

    // console.log("projecTree", projectTrees);

    // const species = await Promise.all(
    //   projectTrees.map(async (project_tree) => {
    //     return await Species.findByPk(project_tree.species_id);
    //   })
    // );

    // console.log("specie", species);

    // console.log("orderLine", orderLine);

    const newOrderLines = await Promise.all(
      orderLine.map(async (line) => {
        // const totalAmount = line.quantity * species[index].price;

        return await Order_line.create({
          order_id: newOrder.id,
          project_tree_id: line.project_tree_id,
          quantity: line.quantity,
          amount: line.amount,
        });
      })
    );

    // Réduire la current_quantity dans Project_tree
    await Promise.all(
      newOrderLines.map(async (newOrderLine) => {
        const projectTree = await Project_tree.findByPk(
          newOrderLine.project_tree_id
        );
        projectTree.current_quantity -= newOrderLine.quantity;
        await projectTree.save();
        console.log(
          "projectTree current_quantity after update",
          projectTree.current_quantity
        );
      })
    );

    return res
      .status(201)
      .json({ message: "Order created successfully", newOrder, newOrderLines });
  },
};

export default orderController;
