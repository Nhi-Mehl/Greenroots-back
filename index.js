import express from 'express';
import session from 'express-session';
import router from './src/router/indexRouter.js';
import backOfficeRouter from './src/router/backoffice/indexRouter.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(session({
    secret:
      process.env.SESSION_SECRET ||
      'session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 2 heures
      maxAge: 1000 * 60 * 60 * 2,
    },
  }),
);

app.use(cors('*'));

app.use(express.json());

app.use('/api', router);
app.use('/admin', backOfficeRouter);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');
});
