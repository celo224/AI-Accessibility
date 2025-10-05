import mongoose from 'mongoose';

const textToSpeechSchema = new mongoose.Schema({

    // 1. Link to the User
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required to track the owner'],
        ref: 'User' // Links to your existing User model
    },

    // 2. The original text that was converted to speech
    originalText: {
        type: String,
        required: [true, 'The source text is required'],
        trim: true,
        minLength: 1,
    },

    // 3. The URL or path to the generated audio file
    audioUrl: {
        type: String,
        required: [true, 'The generated audio URL is required'],
        trim: true,
        unique: true, // Ensures no two records use the same URL
    },

    // 4. The voice/model used for the conversion (optional)
    voiceModel: {
        type: String,
        trim: true,
        required: false,
    },
}, {
    // Schema Options
    timestamps: true // Adds createdAt and updatedAt fields
});

const tts = mongoose.model('tts', textToSpeechSchema);

export default tts;