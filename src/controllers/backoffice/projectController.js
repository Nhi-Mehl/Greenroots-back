import { z } from 'zod';
import { Project, Species, Project_tree } from '../../models/index.js';
import sequelize from '../../database/client.js';


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
    res.render('projects/index', { projects });
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

  async newForm(req, res) {
    const species = await Species.findAll({
      order: [['name', 'ASC']],
    });

    // Générer un token que que je vais utiliser dans le tempalte html
    // On garde ce token en session
    res.render('projects/newProject', { species });
  },

  async create(req, res) {

    const { name, description, picture, status, city, country, continent, trees } = req.body;

    try {
      // Transaction pour garantir que tout se passe bien
      await sequelize.transaction(async (t) => {
        // 1. Créer le projet
        const newProject = await Project.create({
          name,
          description,
          picture,
          status,
          city,
          country,
          continent,
        }, { transaction: t });

        // 2. Ajouter les arbres associés
        if (trees && Array.isArray(trees.species_id)) {
          for (let i = 0; i < trees.species_id.length; i++) {
            await Project_tree.create({
              project_id: newProject.id,  // Associer le projet
              species_id: trees.species_id[i],
              basic_quantity: trees.basic_quantity[i],
              current_quantity: trees.current_quantity[i],
            }, { transaction: t });
          }
        }
      });

      // Si tout se passe bien
      res.redirect('/admin/projects');  // Redirection vers une page de succès ou de liste de projets

    } catch (error) {
      console.error('Error creating project and trees:', error);
      res.status(500).json({ message: 'An error occurred while creating the project and trees' });
    }

  },

  async updateOne(req, res) {
    const { id } = req.params;

    // 1. Je récupère les data du form
    const { name, description, picture, status, city, country, continent, tree } = req.body;

    // 2. Je récupère le projet à mettre à jour
    const project = await Project.findByPk(id, {
      include: {
        association: "project_trees",
        include: ["species"],
      },
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    // 3. Je mets à jour les informations du projet
    project.name = name;
    project.description = description;
    project.picture = picture;
    project.status = status;
    project.city = city;
    project.country = country;
    project.continent = continent;

    // 4. Je sauvegarde le projet
    await project.save();

    // 5. Je mets à jour les arbres du projet
    if (Array.isArray(tree)) {
      for (const treeData of tree) {
        console.log(tree)

        // Convertir species_id et quantity en nombres
        const speciesId = parseInt(treeData.species_id, 10);
        const basicQuantity = parseInt(treeData.quantity, 10);

        if (!treeData.species_id) {
          return res.status(400).json({ message: 'Species ID is required for each tree' });
        }

        if (treeData.id) {
          // Mise à jour d'un arbre existant
          await Project_tree.update(
            { species_id: speciesId, basic_quantity: basicQuantity },
            { where: { id: treeData.id } }
          );
        } else {
          // Ajout d'un nouvel arbre
          await Project_tree.create({
            project_id: id,
            species_id: speciesId,
            basic_quantity: basicQuantity,
          });
        }
      }
    }

    res.redirect('/admin/projects');
  },

  async delete(req, res) {

    // Supprimer les arbres de projets rattachés
    await Project_tree.destroy({
      where: {
        project_id: req.params.id,
      },
    });

    // Supprimer le projet principal
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect('/admin/projects');
  },

};

export default projectController;