import { Router } from 'express';
import projectTreeController from '../controllers/projectTreeController.js';
import cw from '../utils/controllerWrapper.js'

const projectTreeRouter = Router();

// route qui permet de récupérer tous les projets du site
projectTreeRouter.get('/', cw(projectTreeController.getAll));


export default projectTreeRouter;