const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const booksFilePath = path.join(__dirname, '../data', 'books.json');

router.get('/', (req, res) => {
  const booksData = fs.readFileSync(booksFilePath);
  const books = JSON.parse(booksData);
  res.json(books);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const booksData = fs.readFileSync(booksFilePath);
  const books = JSON.parse(booksData);

  const book = books.find(book => book.id === parseInt(id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  res.json(book);
});

router.post('/',  (req, res) => {
  const newBookData = req.body;
  const booksData = fs.readFileSync(booksFilePath);
  const books = JSON.parse(booksData);

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    ...newBookData
  };
  
  books.push(newBook);

  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  res.status(201).json(newBook);
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;

  const booksData = fs.readFileSync(booksFilePath);
  let books = JSON.parse(booksData);

  const bookIndex = books.findIndex(book => book.id === parseInt(id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books[bookIndex] = { ...books[bookIndex], ...updatedBook };

  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  res.json(books[bookIndex]);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const booksData = fs.readFileSync(booksFilePath);
  let books = JSON.parse(booksData);

  books = books.filter(book => book.id !== parseInt(id));

  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  res.status(204).send();
})

module.exports = router;