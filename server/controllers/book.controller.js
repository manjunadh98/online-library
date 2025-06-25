const db = require('../models');
const Book = db.Book;

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const newBook = await Book.create({ title, author, description });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Book.update(req.body, { where: { id } });
    if (updated) {
      const updatedBook = await Book.findByPk(id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
};
