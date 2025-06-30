const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['admin', 'reader'], default: 'reader' }
});

module.exports = mongoose.model('User', userSchema);
