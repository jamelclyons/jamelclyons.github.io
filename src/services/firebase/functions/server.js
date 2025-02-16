import express from 'express';

import userRoutes from './routes/user.js';
import organizationRoutes from './routes/organization.js';
import skillsRoutes from './routes/skills.js';
import projectRoutes from './routes/project.js';
import handler from './middleware/error.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes)
app.use('/organization', organizationRoutes);
app.use('/skill', skillsRoutes);
app.use('/project', projectRoutes);
app.use(handler);

export default app;