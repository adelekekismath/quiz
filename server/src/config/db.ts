import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || ''

export async function connectToDatabase() {
    try {
        await mongoose.connect(uri)
        console.log('✅ Connecté à MongoDB via Mongoose');
    } catch (error) {
        console.error('❌ Erreur de connexion Mongoose:', error);
    }
}
