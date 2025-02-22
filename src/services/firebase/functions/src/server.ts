import express from 'express';
import cors, { CorsOptions } from 'cors';

import checkAdmin from './middleware/admin';

import userRoutes from './routes/user';
import organizationRoutes from './routes/organization';
import skillsRoutes from './routes/skills';
import projectRoutes from './routes/project';
import authRoutes from './routes/authentication';

import handler from './middleware/error';

const app = express();

app.use(express.json());

let origin: string | Array<string> =
  process.env.CORS_ORIGIN ?? 'http://localhost:3000';
  
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:3000';

  console.log(`Server is now accepting request from ${origin}`);
} else {
  if (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN_1) {
    origin = [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_1];

    origin.forEach((url) => {
      console.log(`Server is now accepting request from ${url}`);
    });
  }
}

const corsOptions: CorsOptions = {
  origin: origin,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Refresh-Token'],
};

app.use(cors(corsOptions));

app.post('*', checkAdmin);

app.use('/user', userRoutes);
app.use('/organization', organizationRoutes);
app.use('/skill', skillsRoutes);
app.use('/project', projectRoutes);
app.use('/auth', authRoutes);

app.use(handler);

export default app;
