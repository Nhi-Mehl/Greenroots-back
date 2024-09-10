import { Router } from 'express';
import authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', authController.create);

//authRouter.post('/login', authController.login);

export default authRouter;