import { Router } from 'express';
import userController from '../controllers/userController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const userRouter = Router();

userRouter.get('/me', isLoggedIn, userController.me);

export default userRouter;