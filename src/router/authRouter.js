import { Router } from 'express';
import authController from '../controllers/authController.js';
import cw from '../utils/controllerWrapper.js'

const authRouter = Router();

// route qui permet de créer un nouvel utilisateur
authRouter.post('/register', cw(authController.create));
// route qui permet à un utilisateur existant de se connecter
authRouter.post('/login', cw(authController.login));
// route qui permet à un utilisateur existant de se déconnecter
authRouter.post('/logout', cw(authController.logout));

export default authRouter;