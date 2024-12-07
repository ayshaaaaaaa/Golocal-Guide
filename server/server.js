import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/tourist/userRoutes.js';
import destinationRoutes from './routes/tourist/destinationRoutes.js';
import guideroutes from './routes/guide/guideProfileRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database

app.use('/api/users', userRoutes);
app.use('/api', guideroutes);
app.use('/api', destinationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
