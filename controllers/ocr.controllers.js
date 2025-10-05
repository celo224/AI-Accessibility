import ocr from '../models/ocrmodel.js'; // Import the OCR Model
import asyncHandler from 'express-async-handler'; // For simplified async error handling

// 1. Controller for creating a new OCR record (POST /api/v1/ocr)
export const createOcrRecord = asyncHandler(async (req, res) => {
    // Note: In a real scenario, this endpoint would handle file uploads (e.g., using multer)
    // For simplicity, we assume the imageUrl and userId are passed in the body.
    const { imageUrl, detectedLanguage, userId } = req.body;

    // Basic validation
    if (!imageUrl || !userId) {
        res.status(400);
        throw new Error('Missing required fields: imageUrl or userId.');
    }

    // --- NOTE: REAL OCR LOGIC WOULD GO HERE ---
    // 1. Call an external OCR API (e.g., Google Vision, Tesseract) using the imageUrl.
    // 2. The API returns the extracted text.

    // --- Mock Data for demonstration ---
    const extractedText = "This is the text extracted from the image using OCR.";
    // -----------------------------------

    // Save the new OCR record to the database
    const newOcrRecord = await ocr.create({
        userId,
        imageUrl,
        extractedText,
        detectedLanguage: detectedLanguage || 'unknown',
    });

    res.status(201).json({
        success: true,
        message: 'OCR successfully processed and saved.',
        data: newOcrRecord
    });
});

// 2. Controller for getting all OCR records for a user (GET /api/v1/ocr)
export const getAllOcrRecords = asyncHandler(async (req, res) => {
    // Determine the user ID (from auth middleware or query for testing)
    const userId = req.user ? req.user._id : req.query.userId;

    if (!userId) {
        res.status(401);
        throw new Error('User ID is required to fetch OCR records.');
    }

    // Find all records for the user, sorted by newest first
    const ocrRecords = await ocr.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: ocrRecords.length,
        data: ocrRecords,
    });
});

// 3. Controller for getting a single OCR record by ID (GET /api/v1/ocr/:id)
export const getOcrRecordById = asyncHandler(async (req, res) => {
    const ocrRecord = await ocr.findById(req.params.id);

    if (!ocrRecord) {
        res.status(404);
        throw new Error('OCR record not found.');
    }

    // Optional: Authorization check (ensure the user owns the record)
    // if (ocrRecord.userId.toString() !== req.user._id.toString()) {
    //     res.status(403);
    //     throw new Error('Not authorized to view this record.');
    // }

    res.status(200).json({
        success: true,
        data: ocrRecord,
    });
});