require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/master', require('./routes/masterRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;
const seedInitialData = require('./seed');

connectDB()
  .then(async () => {
    try {
      await seedInitialData();
      console.log('Initial data seeded');
    } catch (error) {
      console.error('Initial data seed failed:', error.message);
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });
