import express from 'express';

import { getData, postData } from '../controllers/database.js';

import checkAdmin from '../middleware/admin.js';
import { WriteResult } from 'firebase-admin/firestore';

const projectRoutes = express.Router();

projectRoutes.post('/:projectID', checkAdmin, async (req, res, next) => {
    try {
        const id = req.params.projectID;
        const data = await postData('portfolio', id, req.body);

        if (data instanceof WriteResult) {
            return res.json({ success_message: `Project with the #ID: ${id} was updated.` });
        }

        return null;
    } catch (error) {
        next(error);
    }
});

projectRoutes.get('/:projectID', async (req, res, next) => {
    try {
        const data = await getData('portfolio', req.params.projectID);
console.log(data)
        if (!data) {
            return res.json(data);
        }

        return null;
    } catch (error) {
        next(error);
    }
});

export default projectRoutes;