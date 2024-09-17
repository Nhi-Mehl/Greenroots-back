import { Router } from 'express';
import speciesController from '../../controllers/backoffice/speciesController.js';
import cw from '../../utils/controllerWrapper.js'

const speciesRouter = Router();

// route qui permet de récupérer toutes les espèces du site
speciesRouter.get('/', cw(speciesController.getAll));
// route qui permet de récupérer une espèce en fonction de son ID
speciesRouter.get('/:id', cw(speciesController.getOne));
// route qui permet de modifier une espèce 
speciesRouter.post('/:id', cw(speciesController.updateOne));

export default speciesRouter;