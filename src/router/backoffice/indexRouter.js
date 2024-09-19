import { Router } from 'express';
import projectRouter from './projectRouter.js';
import speciesRouter from './speciesRouter.js';
import adminRouter from './adminRouter.js';
import checkIsAdmin from '../../middlewares/backoffice/checkIsAdmin.js';

const router = Router();
router.get('/', (req, res) => { 
  
  if(req.session.user && req.session.user.role === "admin") {
    res.redirect('/admin/index');

    
  }
  res.render('login/login'); 

});

router.use('/', adminRouter);
router.get('/index', checkIsAdmin, (req, res) => { res.render('index'); });
router.use('/projects', checkIsAdmin, projectRouter);
router.use('/species', checkIsAdmin, speciesRouter);
router.use('/backoffice', checkIsAdmin, adminRouter);


export default router;