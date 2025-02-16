import express from 'express';
import { getData, getDataCollection } from '../controllers/database.js';

const skillsRoutes = express.Router();

skillsRoutes.get('/:collection', async (req, res, next) => {
    try {
        const data = await getDataCollection(req.params.collection);

        return res.json(data);
    } catch (error) {
        next(error);
    }
});

export default skillsRoutes;