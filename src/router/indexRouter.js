import { Router } from 'express';
import orderRouter from './orderRouter.js';
import projectTreeRouter from './projectTreeRouter.js';
import projectRouter from './projectRouter.js';
import speciesRouter from './speciesRouter.js';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import orderLineRouter from './orderLineRouter.js';

const router = Router();


// Middlewares de toutes les routes


router.use('/projects', projectRouter);
router.use('/orders', orderRouter);
router.use('/project_trees', projectTreeRouter);
router.use('/species', speciesRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/order_line', orderLineRouter);

export default router;