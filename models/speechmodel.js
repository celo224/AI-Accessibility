import mongoose from 'mongoose';

const speechSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User ID is required to track the owner'],
            ref: 'User'
        },
        audioUrl: {
            type: String,
            required: [true, 'The source audio URL is required'],
            trim: true,
        },
        transcript: {
            type: String,
            required: [true, 'Transcript text is required'],
            trim: true,
            minLength: 1,
        },
    },
    {
        timestamps: true
    }
);

const speech = mongoose.model('Speech', speechSchema);

export default speech;