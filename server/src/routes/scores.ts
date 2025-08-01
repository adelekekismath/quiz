import {Score} from '../models/score.js'
import express from 'express'
import { Request, Response } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { AuthRequest } from '../utils/types.js'

export const router = express.Router()

const addSingleUserScore = async (req: Request, res: Response) => {
    try {
        const newScore = new Score(req.body)
        await newScore.save()
        res.status(201).json(newScore)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}


router.post('/',requireAuth, addSingleUserScore )

const getAllUserScores =async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as AuthRequest).userId
        const scores = await Score.find({ userId }).sort({date:-1}).limit(10)
        res.json(scores)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

router.get('/', requireAuth, getAllUserScores)
