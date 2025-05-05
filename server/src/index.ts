import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./database";

dotenv.config();

const app = express();
const {PORT}=process.env;

app.use(express.json());
app.use(cors());
connectDB();
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})