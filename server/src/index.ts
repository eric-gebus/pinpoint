import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./database";
import eventRouter from './routers/event';

dotenv.config();

const app = express();
const {PORT}=process.env;

app.use(express.json());
app.use(cors());
app.use('/events', eventRouter);
connectDB();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})