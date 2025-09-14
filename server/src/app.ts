import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js'
import { router as scoreRouter } from './routes/scores.js';
import { authRouter} from './routes/auth.js'
import {configureCors} from './middleware/cors.js'
dotenv.config();

export const app = express();
configureCors()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/scores', scoreRouter)
app.use('/api/auth', authRouter)


connectToDatabase()
