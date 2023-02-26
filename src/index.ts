import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db';
import router from './routes/Router';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});

connectDB();
