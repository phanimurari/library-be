const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const payload = { id: req.user._id, email: req.user.email, name: req.user.name };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  // Return tokens to frontend for localStorage handling
  res.redirect(`${process.env.FRONTEND_URL}?access=${accessToken}&refresh=${refreshToken}`);
});

router.post('/refresh-token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Refresh token required' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: payload.id, email: payload.email, name: payload.name }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;
