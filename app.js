import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from './config/env.js';

import speechRouter from './routes/speech.js';
import ttsRouter from './routes/tts.js';
import ocrRouter from './routes/ocr.js';
import translateRouter from './routes/translate.js';
import connectToDatabase from './database/mangodb.js';
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/speech', speechRouter);
app.use('/api/v1/tts', ttsRouter);
app.use('/api/v1/ocr', ocrRouter);
app.use('/api/v1/translate', translateRouter);

app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send("Welcome to AI Accessibility tools");
});

app.listen(PORT, 'localhost', async() => {
    console.log(`AI accessibility running on http://localhost:${ PORT }`);

    await connectToDatabase();
});

export default app;