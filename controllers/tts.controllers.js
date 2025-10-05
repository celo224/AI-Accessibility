import tts from '../models/ttsmodel.js'; // Import the TTS Model
import asyncHandler from 'express-async-handler'; // Used for simplified async error handling

// 1. Controller for creating new TTS audio (POST /api/v1/tts)
export const createTtsAudio = asyncHandler(async (req, res) => {
    // Destructure required input fields
    const { originalText, voiceModel, userId } = req.body;

    // Basic validation
    if (!originalText || !userId) {
        res.status(400);
        throw new Error('Missing required fields: originalText or userId.');
    }

    // --- MOCK AUDIO GENERATION ---
    // In a real app, an external API call would occur here to get the real audio URL.
    const generatedAudioUrl = `/audio/tts/${Date.now()}_${userId}.mp3`;
    // ----------------------------

    // Save the new TTS record to the database
    const newTtsRecord = await tts.create({
        userId,
        originalText,
        voiceModel: voiceModel || 'default', // Use provided voice or 'default'
        audioUrl: generatedAudioUrl, // Save the generated URL
    });

    res.status(201).json({
        success: true,
        message: 'Text successfully converted to speech.',
        data: newTtsRecord
    });
});

// 2. Controller for getting all TTS records for a user (GET /api/v1/tts)
export const getAllTtsRecords = asyncHandler(async (req, res) => {
    // Get the user ID from the authenticated request or query param
    const userId = req.user ? req.user._id : req.query.userId;

    if (!userId) {
        res.status(401);
        throw new Error('User ID is required to fetch TTS records.');
    }

    // Find all records for the specific user, sorted by newest first
    const ttsRecords = await tts.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: ttsRecords.length,
        data: ttsRecords,
    });
});

// 3. Controller for getting a single TTS record by ID (GET /api/v1/tts/:id)
export const getTtsRecordById = asyncHandler(async (req, res) => {
    const ttsRecord = await tts.findById(req.params.id);

    if (!ttsRecord) {
        res.status(404);
        throw new Error('TTS record not found.');
    }

    res.status(200).json({
        success: true,
        data: ttsRecord,
    });
});