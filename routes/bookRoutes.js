const express = require('express');
const { body } = require('express-validator');
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/', 
  [
    body('title', 'Title is required').not().isEmpty(),
    body('author', 'Author is required').not().isEmpty(),
    // body('isbn', 'ISBN must be unique').isISBN()
  ],

  createBook
);

router.get('/', getBooks);


router.get('/:id', getBookById);


router.put('/:id', auth, updateBook);


router.delete('/:id', auth, deleteBook);

module.exports = router;
