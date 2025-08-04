import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/routes';
import authRoutes from './routes/authRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api', authRoutes);

// Rutas protegidas (clientes, productos, etc.)
app.use('/api', mainRouter);

export default app;