import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import leadRoutes from './routes/leadRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = [
  frontendUrl,
  frontendUrl.replace(/\/$/, ''),
  frontendUrl.replace(/\/$/, '') + '/',
  'http://localhost:3000',
  'http://localhost:3000/',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
