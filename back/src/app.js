import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from "./routes/auth/auth.router.js";

dotenv.config();
const FRONT_PORT = process.env.FRONT_PORT || 3000;

const app = express();

app.use(cors({
    origin: `http://localhost:${FRONT_PORT}`
}));
app.use(morgan('combined'));

app.use(express.json());

app.use('/auth', authRouter);

export default app;