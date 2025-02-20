import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user';
import organizationRoutes from './routes/organization';
import skillsRoutes from './routes/skills';
import projectRoutes from './routes/project';
import authRoutes from './routes/authentication';

import handler from './middleware/error';

import { origin } from './config';

console.log(`Server is now accepting request from ${origin}`)

const app = express();

app.use(express.json());
app.use(cors({ origin: origin }));

app.use('/user', userRoutes);
app.use('/organization', organizationRoutes);
app.use('/skill', skillsRoutes);
app.use('/project', projectRoutes);
app.use('/auth', authRoutes);

app.use(handler);

export default app;
