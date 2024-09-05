import { Router } from 'express';
import projectController from '../controllers/projectController.js';
import cw from '../utils/controllerWrapper.js'

const projectRouter = Router();

// route qui permet de récupérer tous les projets du site
projectRouter.get('/', cw(projectController.getAll));
// permet de récupérer 3 projets random de la page accueil
projectRouter.get('/highlights', cw(projectController.getThreeRandomProjects));
// permet qui permet de récupérer un seul projet avec les arbres associés 
projectRouter.get('/:id', cw(projectController.getOne));
//permet de récupérer les arbres d'un projet
projectRouter.get('/:id/project_trees', cw(projectController.getOneProjectTrees));


export default projectRouter;
