import { z } from 'zod';
import { Project } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';
import { Sequelize } from 'sequelize';
//import { Association } from 'sequelize';

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
          order: [['name', 'ASC']],
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
          //order: [['name', 'ASC']],
          order: Sequelize.literal('RANDOM()'),
          limit: 3
        });
        res.json(threeRandomProjects);
      },
      

      // controller pour récupérer un seul projet en fonction de son id en incluant les arbres et les espèces du projet

      
      async getOneProjectTrees(req, res) {
        const { id } = req.params;

        const oneProject = await Project.findByPk(id, {
            include: [
                {
                    association: 'project_trees',
                    include: [
                        {
                            association: 'species'
                        }
                    ]
                }
            ],
          // order: [['name', 'ASC']],
        });
        res.json(oneProject);
        console.log(oneProject);
      },

};

export default projectController;