import { Router } from 'express';
import authController from '../controllers/authController.js';
import cw from '../utils/controllerWrapper.js'

const authRouter = Router();

authRouter.post('/register', cw(authController.create));

authRouter.post('/login', cw(authController.login));

export default authRouter;