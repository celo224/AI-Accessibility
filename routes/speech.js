import { Router } from 'express';

import {
    createTranscription,
    getAllTranscriptions,
    getTranscriptionById
} from '../controllers/speech.controllers.js';

const speechRouter = new Router();

speechRouter.post('/', createTranscription);
speechRouter.get('/', getAllTranscriptions);
speechRouter.get('/:id', getTranscriptionById);

export default speechRouter;