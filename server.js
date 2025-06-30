// 📁 server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { authenticateJWT } = require('./middlewares/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/api', authenticateJWT, apiRoutes);

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(8005, () => console.log('Server running on http://localhost:8005'));
  })
  .catch(err => console.error(err));

