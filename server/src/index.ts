import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { Request, Response } from 'express';


dotenv.config();

const app = express();
const {PORT}=process.env;

app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})