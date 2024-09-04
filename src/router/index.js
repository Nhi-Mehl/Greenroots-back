import { Router } from 'express';
import orderRouter from './order';
import projectTreeRouter from './projectTree';
import projectRouter from './project';
import speciesRouter from './species';
import userRouter from './user';

const router = Router();


router.use('/api/v1/projects', projectRouter);
router.use('/api/v1/orders', orderRouter);
router.use('/api/v1/project_trees', projectTreeRouter);
router.use('/api/v1/species', speciesRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/project_trees', projectTreeRouter);

export default router;