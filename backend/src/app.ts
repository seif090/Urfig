import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import customizerRoutes from './routes/customizerRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import promoRoutes from './routes/promoRoutes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Basic Route for Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customizer', customizerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/promo', promoRoutes);

export default app;
