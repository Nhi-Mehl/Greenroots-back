import { Router } from 'express';
import projectController from '../controllers/projectController.js';
import cw from '../utils/controllerWrapper.js'

const projectRouter = Router();

// route qui permet de récupérer tous les projets du site
projectRouter.get('/', cw(projectController.getAll));



export default projectRouter;
