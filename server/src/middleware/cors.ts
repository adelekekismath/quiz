import {app} from '../app.ts'
import cors from 'cors'
import express from 'express'

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000'
    })
);
app.use(express.json())