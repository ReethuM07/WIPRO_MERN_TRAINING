const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: '1984', author: 'Orwell' },
  { id: 2, title: 'The Alchemist', author: 'Coelho' }
];

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author required' });
  }

  const book = {
    id: books.length + 1,
    title,
    author
  };

  books.push(book);
  res.status(201).json(book);
});

module.exports = router;
