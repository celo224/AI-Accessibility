import { Router } from "express";

// Import the controller functions that handle the business logic
import {
    createTtsAudio,
    getAllTtsRecords,
    getTtsRecordById
} from '../controllers/tts.controllers.js';

const ttsRouter = Router();

// Route 1: POST /
// Endpoint to submit text for conversion and save the generated audio URL.
ttsRouter.post('/', createTtsAudio);

// Route 2: GET /
// Endpoint to retrieve a list of all past TTS records for the user.
ttsRouter.get('/', getAllTtsRecords);

// Route 3: GET /:id
// Endpoint to retrieve a specific TTS record by its unique ID.
ttsRouter.get('/:id', getTtsRecordById);

export default ttsRouter;