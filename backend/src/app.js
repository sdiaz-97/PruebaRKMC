import cors from 'cors';
// import connectDB from './utils/database';
import express from 'express';
import apiRoutes from './routers/index.routes.js'; 

const app = express();
app.use(cors());
app.set('port', 5000);
app.use(express.json());

app.use('/', apiRoutes);

// connectDB()

export default app;
