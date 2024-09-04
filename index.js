import express from 'express';
import router from './src/router/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';

const app = express();


app.use(cors('*'));

app.use(express.json());

app.use(router);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');
});