const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  publicationYear: { type: Number },
  imageUrl: { type: String, default: 'https://via.placeholder.com/150' },
  isbn: { type: String, unique: true },
  description: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);
