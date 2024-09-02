import express from 'express';
import router from './src/router/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

// Je vais spécifier les nom de domaine qui peuvent accéder à mon API
// Souvent quand on est en développement, on ne s'embête pas. On met * pour dire que tout le monde peut accéder à notre API
app.use(cors('*'));

app.use(express.json());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');
});