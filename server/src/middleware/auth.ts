import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  userId?: string
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction)  => {
    const authHeader = req.headers.authorization

    if(!authHeader?.startsWith('Bearer')){
        return res.status(401).json({error: 'Token missing'})
    }

    const token = authHeader.split(' ')[1]
    console.log('authHeader:', authHeader)
    console.log('token:', token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string}
        req.userId = decoded.userId

        next()
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }

}