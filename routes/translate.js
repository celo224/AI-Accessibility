import { Router } from "express";

// Import the functions from the controller
import {
    createTranslation,
    getAllTranslations,
    getTranslationById
} from '../controllers/translate.controllers.js';

const translateRouter = Router();

// Route 1: POST / - Used to submit text for translation and save the result
translateRouter.post('/', createTranslation);

// Route 2: GET / - Used to retrieve all past translations for the user
translateRouter.get('/', getAllTranslations);

// Route 3: GET /:id - Used to retrieve a single translation by ID
translateRouter.get('/:id', getTranslationById);

export default translateRouter;