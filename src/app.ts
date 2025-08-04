import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/routes';
import authRoutes from './routes/authRoutes';
import botRoutes from './routes/botRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api', authRoutes);

// Rutas del bot de Telegram
app.use('/api', botRoutes);

// Rutas protegidas (clientes, productos, etc.)
app.use('/api', mainRouter);

export default app;