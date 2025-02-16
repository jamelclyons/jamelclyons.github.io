import express from 'express';
import { getData } from '../controllers/database.js';

const userRoutes = express.Router();

userRoutes.get('/:id', async (req, res, next) => {
    try {
        const data = await getData("user", req.params.id);

        return res.json(data);
    } catch (error) {
        next(error);
    }
});

export default userRoutes;