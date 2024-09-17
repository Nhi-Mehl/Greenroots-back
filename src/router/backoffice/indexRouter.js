import { Router } from 'express';
import projectRouter from './projectRouter.js';
import speciesRouter from './speciesRouter.js';
import adminRouter from './adminRouter.js'

const router = Router();

router.use('/projects', projectRouter);
router.use('/species', speciesRouter);
router.use('/backoffice', adminRouter);


export default router;