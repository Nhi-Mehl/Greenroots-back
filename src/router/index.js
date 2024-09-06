import { Router } from 'express';
import orderRouter from './order.js';
import projectTreeRouter from './projectTree.js';
import projectRouter from './project.js';
import speciesRouter from './species.js';
import userRouter from './user.js';

const router = Router();


// Middlewares de toutes les routes


router.use('/projects', projectRouter);
router.use('/orders', orderRouter);
router.use('/project_trees', projectTreeRouter);
router.use('/species', speciesRouter);
router.use('/users', userRouter);

export default router;