import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/config/db.ts'
import { router as scoreRouter } from './src/routes/scores.ts';

dotenv.config();


export const app = express();

connectToDatabase()

app.use(express.json())
app.use('/api/scores', scoreRouter)

