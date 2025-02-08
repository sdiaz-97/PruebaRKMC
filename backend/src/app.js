import cors from 'cors';
import express from 'express';
import apiRoutes from './routers/index.routes.js'; 

const app = express();
app.use(cors());
app.set('port', 5000);
app.use(express.json());

app.use('/', apiRoutes);


export default app;
