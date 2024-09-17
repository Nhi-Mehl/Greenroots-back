import { Router } from 'express';
import projectRouter from './projectRouter.js';
import speciesRouter from './speciesRouter.js';

const router = Router();

router.use('/index', (req, res) => { res.render('index'); })
router.use('/projects', projectRouter);
router.use('/species', speciesRouter);

export default router;