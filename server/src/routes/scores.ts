import {Score} from '../models/score'
import express from 'express'
import { Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'

export const router = express.Router()


router.post('/',requireAuth, async (req: Request, res: Response) => {
    try {
        const newScore = new Score(req.body)
        await newScore.save()
        res.status(201).json(newScore)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/', async (req: Request, res: Response) => {
    try {
        const scores = await Score.find().sort({date:-1}).limit(10)
        res.json(scores)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})
