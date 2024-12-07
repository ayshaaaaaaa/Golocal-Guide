import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/tourist/userRoutes.js';
import destinationRoutes from './routes/tourist/destinationRoutes.js';
import guideRoutes from './routes/guide/guideProfileRoutes.js';
// import packageRoutes from './routes/guide/packagesRoutes.js';  // Default import

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database

// Mount routes with proper prefixes
app.use('/api/users', userRoutes);
app.use('/api/guides', guideRoutes); // Changed to /api/guides to match frontend requests
app.use('/api/destinations', destinationRoutes); // Added proper prefix for consistency
// app.use('/api', guideRoutes);
// app.use('/api', packageRoutes);

// Example login route for issuing JWT tokens
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace this with real database check)
  if (username === 'admin' && password === 'password') {
    const user = { username }; // This can be expanded to include more user details
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});