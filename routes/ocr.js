import { Router } from "express";

// Import the controller functions (which you'll need to create in ocr.controllers.js)
import {
    createOcrRecord,
    getAllOcrRecords,
    getOcrRecordById
} from '../controllers/ocr.controllers.js';

const ocrRouter = Router();

// Route 1: POST /
// Endpoint to upload an image and initiate the OCR process.
ocrRouter.post('/', createOcrRecord);

// Route 2: GET /
// Endpoint to retrieve a list of all past OCR records (extracted text) for the user.
ocrRouter.get('/', getAllOcrRecords);

// Route 3: GET /:id
// Endpoint to retrieve a specific OCR record by its unique ID.
ocrRouter.get('/:id', getOcrRecordById);

export default ocrRouter;