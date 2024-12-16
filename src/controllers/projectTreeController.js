import { z } from "zod";
import { Project_tree } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";
import sequelize from "../database/client.js";

const projectTreeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  picture: z.string().min(1),
  status: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  continent: z.string().min(1),
});

const projectTreeController = {
  async getOneProjectTreesProject(req, res) {
    const projectId = req.params.project_id;
    const projectTrees = await Project_tree.findAll({
      order: [["id", "ASC"]],
      where: {
        project_id: projectId,
      },
      include: [
        {
          association: "species",
        },
      ],
    });
    const totalBasicQuantity = projectTrees.reduce((sum, tree) => {
      return sum + tree.basic_quantity;
    }, 0);
    const totalCurrentQuantity = projectTrees.reduce((sum, tree) => {
      return sum + tree.current_quantity;
    }, 0);
    const totalProgress = totalBasicQuantity
      ? Math.min(
          ((totalBasicQuantity - totalCurrentQuantity) / totalBasicQuantity) *
            100,
          100
        )
      : 0;

    return res.status(200).json({
      progress: totalProgress,
      trees: projectTrees,
      totalBasicQuantity,
    });
  },
  async getOneProjectTrees(req, res) {
    const projectTrees = await Project_tree.findAll({
      order: [["id", "ASC"]],
      where: {
        project_id: req.params.project_id,
      },
      include: [
        {
          association: "species",
        },
      ],
    });
    res.json(projectTrees);
    console.log(projectTrees);
  },

  async getOne(req, res) {
    const id = req.params.id;

    const projectTree = await Project_tree.findByPk(id, {
      include: [
        {
          association: "species",
        },
      ],
    });
    if (!projectTree) {
      throw new NotFoundError(
        "Project tree not found. Please verify the provided ID."
      );
    }
    res.json(projectTree);
  },

  async getThreeMostBought(req, res) {
    const [threeTrees] = await sequelize.query(`
           SELECT pt.id, sp.name AS tree_name, pt.basic_quantity, pt.current_quantity,
                  (pt.basic_quantity - pt.current_quantity) AS sold_quantity, sp.description, sp.price, sp.picture, sp.co2_compensation, p.name, pt.project_id
           FROM project_tree pt
           JOIN species sp ON pt.species_id = sp.id
           JOIN project p ON pt.project_id = p.id
           ORDER BY sold_quantity DESC
           LIMIT 3;

            `);
    res.json(threeTrees);
  },

  async plantedTreesCounter(req, res) {
    // On exécute avec Sequelize la requête calculant le total d'arbres plantés
    const [rows] = await sequelize.query(`
        SELECT SUM(basic_quantity - current_quantity) AS totalDifference
        FROM project_tree;
      `);

    // On affiche uniquement la valeur numérique de la première ligne du tableau dans la réponse JSON
    res.json(Number(rows[0].totaldifference));
  },

  //   async getThreesHomePage(req, res) {
  //     const { project_id } = req.params;

  //     const treesHomePage = await Project_tree.findAll({
  //       order: [["id", "ASC"]],
  //       where: {
  //         project_id: project_id,
  //       },
  //       include: [
  //         {
  //           association: "species",
  //         },
  //       ],
  //     });
  //     res.json(projectTrees);
  //     console.log(projectTrees);
  //   },
};

export default projectTreeController;
