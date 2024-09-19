import { Router } from 'express';
import projectController from '../../controllers/backoffice/projectController.js';
import cw from '../../utils/controllerWrapper.js'

const projectRouter = Router();

// route qui permet de récupérer tous les projets du site
projectRouter.get('/', cw(projectController.getAll));
projectRouter.get('/new_project', cw(projectController.newForm));
projectRouter.post('/new_project', cw(projectController.create));
projectRouter.get('/:id', cw(projectController.getOne));
projectRouter.post('/:id', cw(projectController.updateOne));
projectRouter.get('/:id/delete', cw(projectController.delete));

export default projectRouter;