import express, {Request, Response} from 'express';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();

authRouter.post('/register', async(req: Request, res:Response) => {
    try {
        const {email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({error: 'User is already existed'})

        const user = new User({email,password})
        await user.save()

        res.status(201).json({message: 'Successfully registered user'})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
})

authRouter.post('/login', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})

        if(!user || !(await user.comparePassword(password) )){
            return res.status(401).json({error: 'Email or password is incorrect'})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'})

        res.json({token})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
})

