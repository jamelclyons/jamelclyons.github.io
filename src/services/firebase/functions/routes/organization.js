import express from 'express';
import { getData } from '../controllers/database.js';

const organizationRoutes = express.Router();

organizationRoutes.get('/:id', async (req, res, next) => {
    try {
        const data = await getData("organization", req.params.id);

        return res.json(data);
    } catch (error) {
        next(error);
    }
});

export default organizationRoutes;