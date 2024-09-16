import { z } from 'zod';
import { Project } from '../../models/index.js';
import { Species } from '../../models/index.js';
import { Sequelize } from 'sequelize';
//import { Association } from 'sequelize';

// const projectSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   picture: z.string().min(1),
//   status: z.string().min(1),
//   city: z.string().min(1),
//   country: z.string().min(1),
//   continent: z.string().min(1),
// });


const projectController = {
  // controller pour récupérer tous les projets de la BDD
  async getAll(req, res) {
    const projects = await Project.findAll({
      order: [['name', 'ASC']],
    });
    res.render('projects', { projects });
  },

  // controller pour récupérer un seul projet en fonction de son id

  async getOne(req, res) {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: {
        association: "project_trees",
        include: ["species"],
      },
    });

    const species = await Species.findAll({
      order: [['name', 'ASC']],
    });

    console.log(project);
    res.render('projects/view', { project, species });
  },

  async create(req, res) {
    // TODO 

  },

  async updateOne(req, res) {
    const { id } = req.params;

    // 1. Je récupère les data du form
    const { name, description } = req.body;

    const project = await Project.findByPk(id, {
      include: {
        association: "project_trees",
        include: ["species"],
      },
    });

    // 2. Je les sets sur le projet
    project.name = name;
    project.description = description;

    // 3. Je sauvegarde le projet
    await project.save();

    const species = await Species.findAll({
      order: [['name', 'ASC']],
    });

    res.render('projects/view', { project, species });
  }

};

export default projectController;