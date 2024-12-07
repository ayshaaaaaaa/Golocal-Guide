import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import businessSetupRoutes from './routes/business/businessSetupRoutes.js';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/business-setup', businessSetupRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

