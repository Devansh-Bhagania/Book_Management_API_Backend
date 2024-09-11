const Book = require('../models/Book');
const { validationResult } = require('express-validator');


exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, author, genre, publicationYear, imageUrl, isbn, description } = req.body;

  try {
    const newBook = new Book({ title, author, genre, publicationYear, imageUrl, isbn, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBooks = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; 

    const startIndex = (page - 1) * limit;


    const books = await Book.find()
      .skip(startIndex)
      .limit(limit);


    const totalBooks = await Book.countDocuments();


    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      totalBooks,
      totalPages,
      currentPage: page,
      booksPerPage: limit,
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error });
  }
}


// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author, genre, publicationYear, imageUrl, isbn, description } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationYear = publicationYear || book.publicationYear;
    book.imageUrl = imageUrl || book.imageUrl;
    book.isbn = isbn || book.isbn;
    book.description = description || book.description;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
