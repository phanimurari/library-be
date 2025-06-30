const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', async (req, res) => {
  const user = await User.findById(req.user.id).select('name email');
  res.json(user);
});

router.get('/books', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

module.exports = router;
