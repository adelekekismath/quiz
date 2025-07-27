import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


export const requireAuth = (req: Request, res: Response, next: NextFunction)  => {
    const authHeader = req.headers.authorization

    if(!authHeader?.startsWith('Bearer')){
        return res.status(401).json({error: 'Token missing'})
    }

    const token = authHeader.split('')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string}
        ;(req as any).userId = decoded.userId
        console.log('User ID:', (req as any).userId)
        next()
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }

}