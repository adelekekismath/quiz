import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/config/db.ts'
import { router as scoreRouter } from './src/routes/scores.ts';
import { authRouter} from './src/routes/auth.ts'
dotenv.config();


export const app = express();

app.use(express.json())
app.use('/api/scores', scoreRouter)
app.use('/api/auth', authRouter)

connectToDatabase()
