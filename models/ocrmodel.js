import mongoose from 'mongoose';

const ocrSchema = new mongoose.Schema({
    // 1. Link to the User
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required to track the owner'],
        ref: 'User' // Links to your existing User model
    },

    // 2. The URL or path to the original image file
    imageUrl: {
        type: String,
        required: [true, 'The source image URL is required'],
        trim: true,
    },

    // 3. The extracted text output
    extractedText: {
        type: String,
        required: [true, 'Extracted text is required'],
        trim: true,
        minLength: 1, // Ensures the extracted text field is not empty
    },

    // Optional: Language detected in the text (e.g., 'eng', 'spa')
    detectedLanguage: {
        type: String,
        trim: true,
        required: false,
    },
}, {
    // Schema Options
    timestamps: true // Adds createdAt and updatedAt fields
});

const ocr = mongoose.model('OCR', ocrSchema);

export default ocr;