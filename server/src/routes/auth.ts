import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();


authRouter.post('/register', async(req: Request, res:Response) => {
    try {
        const {username, email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({error: 'User already existed'})

        const user = new User({username, email,password})
        await user.save()

        res.status(201).json({message: 'Successfully registered user'})
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

authRouter.post('/login', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})

        console.log('User found:', user);
        if(!user || !(await user.comparePassword(password) )){
            return res.status(401).json({error: 'Email or password is incorrect'})
        }
        console.log(user._id, 'is the user id');
        console.log('User password:', user.password);

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'})
        console.log('Login successful, token generated:', token);
        res.json({token})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
})

authRouter.get('/me', async(req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).json({error: 'Unauthorized'})

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string}
        const user = await User.findById(decoded.userId).select('-password')
        if(!user) return res.status(404).json({error: 'User not found'})

        res.json(user)
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
});

