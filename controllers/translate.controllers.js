import translate from '../models/translatemodel.js'; // Import the Translation Model
import asyncHandler from 'express-async-handler'; // Recommended for handling async errors

// 1. Controller for creating a new Translation record (POST /api/v1/translate)
export const createTranslation = asyncHandler(async (req, res) => {
    // Destructure required fields from the request body
    const { sourceText, sourceLanguage, targetLanguage, userId } = req.body;

    // Basic validation based on required fields in the model
    if (!sourceText || !sourceLanguage || !targetLanguage || !userId) {
        res.status(400);
        throw new Error('Missing required fields: source text, languages, or user ID.');
    }

    // --- NOTE: REAL TRANSLATION LOGIC ---
    // In a production app, the actual translation API call happens here.
    // The result is assigned to translatedText.
    const translatedText = `(Mock Translation of "${sourceText}" to ${targetLanguage})`;
    // ------------------------------------

    // Save the new translation record to the database
    const newTranslation = await translate.create({
        userId,
        sourceText,
        sourceLanguage,
        targetLanguage,
        translatedText,
    });

    res.status(201).json({
        success: true,
        data: newTranslation
    });
});

// 2. Controller for getting all Translations for a user (GET /api/v1/translate)
export const getAllTranslations = asyncHandler(async (req, res) => {
    // Use the authenticated user's ID for filtering
    const userId = req.user ? req.user._id : req.query.userId;

    if (!userId) {
        res.status(401);
        throw new Error('User ID is required to fetch translations.');
    }

    const translations = await translate.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: translations.length,
        data: translations,
    });
});

// 3. Controller for getting a single Translation by ID (GET /api/v1/translate/:id)
export const getTranslationById = asyncHandler(async (req, res) => {
    const translationRecord = await translate.findById(req.params.id);

    if (!translationRecord) {
        res.status(404);
        throw new Error('Translation record not found.');
    }

    res.status(200).json({
        success: true,
        data: translationRecord,
    });
});