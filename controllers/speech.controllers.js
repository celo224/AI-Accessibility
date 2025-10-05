import speech from '../models/speechmodel.js';
import asyncHandler from 'express-async-handler';


// 1. Controller for creating a new Transcription (POST /api/v1/speech)
export const createTranscription = asyncHandler(async (req, res) => {
    // --- FIX APPLIED HERE: DESTRUCTURING FROM req.body MUST COME FIRST ---
    const { audioUrl, transcript, userId } = req.body;
    // --------------------------------------------------------------------

    // Basic validation based on the destructured variables
    if (!audioUrl || !transcript || !userId) {
        res.status(400);
        throw new Error('Please provide audioUrl, transcript, and userId.');
    }

    // --- NOTE ON REAL-WORLD FLOW ---
    // The actual STT service call would happen here, using audioUrl to get the real transcript.
    // For now, we use the mock transcript provided in the body for testing the route.
    // --------------------------------

    // The 'create' method is a standard Mongoose function on the 'speech' model.
    const newTranscription = await speech.create({
        userId: userId,
        audioUrl: audioUrl,
        transcript: transcript,
    });

    res.status(201).json({
        success: true,
        message: 'Transcription saved successfully.',
        data: newTranscription
    });
});

// 2. Controller for getting all Transcriptions for a user (GET /api/v1/speech)
export const getAllTranscriptions = asyncHandler(async (req, res) => {
    const userId = req.user ? req.user._id : req.query.userId;

    if (!userId) {
        res.status(401);
        throw new Error('User ID is required to fetch transcriptions.');
    }

    const transcriptions = await speech.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: transcriptions.length,
        data: transcriptions,
    });
});

// 3. Controller for getting a single Transcription by ID (GET /api/v1/speech/:id)
export const getTranscriptionById = asyncHandler(async (req, res) => {
    const transcription = await speech.findById(req.params.id);

    if (!transcription) {
        res.status(404);
        throw new Error('Transcription record not found.');
    }

    res.status(200).json({
        success: true,
        data: transcription,
    });
});