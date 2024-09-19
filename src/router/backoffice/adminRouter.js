import { Router } from 'express';
import cw from '../../utils/controllerWrapper.js'
import adminController from '../../controllers/backoffice/adminController.js';

const adminRouter = Router();

// Permet à l'admin de se connecter à son compte back office

adminRouter.post('/login', cw(adminController.loginAction));

// Permet à l'admin de se déconnecter de son compte back office

adminRouter.post('/logout', cw(adminRouter))


export default adminRouter;