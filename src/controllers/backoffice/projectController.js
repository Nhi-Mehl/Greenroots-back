import {
  z
} from 'zod';
import {
  Project
} from '../../models/index.js';
import {
  Species
} from '../../models/index.js';
import {
  Sequelize
} from 'sequelize';


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
      order: [
        ['name', 'ASC']
      ],
    });
    res.render('projects/index', {
      projects
    });
  },

  // controller pour récupérer un seul projet en fonction de son id

  async getOne(req, res) {
    const {
      id
    } = req.params;

    const project = await Project.findByPk(id, {
      include: {
        association: "project_trees",
        include: ["species"],
      },
    });

    const species = await Species.findAll({
      order: [
        ['name', 'ASC']
      ],
    });

    console.log(project);
    res.render('projects/view', {
      project,
      species
    });
  },

  async newForm(req, res) {
    const species = await Species.findAll({
      order: [
        ['name', 'ASC']
      ],
    });
    res.render('projects/newProject', {
      species
    });
  },

  async create(req, res) {
    // TODO 
    await Project.create(req.body);

    // Une fois le projet créé, je redirige l'utilisateur vers la liste des projets
    res.redirect('/admin/projects');
  },

  async updateOne(req, res) {
    const {
      id
    } = req.params;

    // 1. Je récupère les data du form
    const {
      name,
      description,
      picture,
      status,
      city,
      country,
      continent
    } = req.body;

    const project = await Project.findByPk(id, {
      include: {
        association: "project_trees",
        include: ["species"],
      },
    });

    // 2. Je les sets sur le projet
    project.name = name;
    project.description = description;
    project.picture = picture;
    project.status = status;
    project.city = city;
    project.country = country;
    project.continent = continent;


    // 3. Je sauvegarde le projet
    await project.save();



    const species = await Species.findAll({
      order: [
        ['name', 'ASC']
      ],
    });

    res.render('projects/view', {
      project,
      species
    });
  }

};

export default projectController;