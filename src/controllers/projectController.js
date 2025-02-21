import { z } from "zod";
import { Project } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";
import { Sequelize } from "sequelize";

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  picture: z.string().min(1),
  status: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  continent: z.string().min(1),
});

const projectController = {
  // controller pour récupérer tous les projets de la BDD
  async getAll(req, res) {
    const projects = await Project.findAll({
      order: [["name", "ASC"]],
    });
    res.json(projects);
  },

  // controller pour récupérer un seul projet en fonction de son id
  async getOne(req, res) {
    const { id } = req.params;

    const oneProject = await Project.findByPk(id);
    res.json(oneProject);
  },

  // controller pour récupérer 3 projets de façon aléatoire
  async getThreeRandomProjects(req, res) {
    const threeRandomProjects = await Project.findAll({
      order: Sequelize.literal("RANDOM()"),
      limit: 3,
    });
    res.json(threeRandomProjects);
  },

  // fonction pour calculer le nombre de projets terminés
  async countAllProducts(req, res) {
    const totalProjects = await Project.count({
      where: {
        status: "Terminé",
      },
    });
    console.log(`Total number of projects: ${totalProjects}`);
    res.json(totalProjects);
  },

  // fonction pour afficher tous les projets dans le back-office
  async backOfficeGetAll(req, res) {
    const projects = await Project.findAll({
      order: [["name", "ASC"]],
    });
    res.render(projects);
  },
};

export default projectController;
