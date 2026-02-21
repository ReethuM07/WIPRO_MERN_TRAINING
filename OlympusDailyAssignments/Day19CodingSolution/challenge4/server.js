const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
  { id: 1, title: '1984', author: 'Orwell' },
  { id: 2, title: 'The Alchemist', author: 'Coelho' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
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

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: 'Book deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
