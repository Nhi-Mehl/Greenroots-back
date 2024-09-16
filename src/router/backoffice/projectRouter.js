import { Router } from 'express';
import projectController from '../../controllers/backoffice/projectController.js';
import cw from '../../utils/controllerWrapper.js'

const projectRouter = Router();

// route qui permet de récupérer tous les projets du site
projectRouter.get('/', cw(projectController.getAll));
projectRouter.get('/:id', cw(projectController.getOne));
projectRouter.post('/:id', cw(projectController.updateOne));

export default projectRouter;