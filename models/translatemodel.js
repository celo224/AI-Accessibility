import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required to track the owner'],
        ref: 'User' // Links to your existing User model
    },

    sourceText: {
        type: String,
        required: [true, 'Source text is required'],
        trim: true,
        minLength: 1,
    },

    sourceLanguage: {
        type: String,
        required: [true, 'Source language is required'],
        trim: true,
        maxLength: 10,
    },

    targetLanguage: {
        type: String,
        required: [true, 'Target language is required'],
        trim: true,
        maxLength: 10,
    },

    translatedText: {
        type: String,
        required: [true, 'Translated text is required'],
        trim: true,
        minLength: 1,
    },
}, {

    timestamps: true
});

const translation = mongoose.model('translation', translationSchema);

export default translation;