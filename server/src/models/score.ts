import mongoose from 'mongoose';

export const scoreSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    score: {type: Number, require: true},
    totalQuestions: {type: Number, require:true},
    choices: {type: Array, require: true},
    quizType: {type: String},
    date: { type:Date, default: Date.now}
})


export const Score = mongoose.model('Score', scoreSchema)