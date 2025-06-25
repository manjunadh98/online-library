const db = require('../models');
const Borrow = db.Borrow;
const Book = db.Book;

// Borrow a book
exports.borrowBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    // Check if the user already borrowed the book and hasn't returned it
    const alreadyBorrowed = await Borrow.findOne({
      where: { userId, bookId, returnDate: null },
    });

    if (alreadyBorrowed) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowDate: new Date(),
    });

    res.status(201).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    res.status(500).json({ message: 'Failed to borrow book', error });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const borrow = await Borrow.findOne({
      where: { userId, bookId, returnDate: null },
    });

    if (!borrow) {
      return res.status(404).json({ message: 'No active borrow found for this book' });
    }

    borrow.returnDate = new Date();
    await borrow.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to return book', error });
  }
};

// Get user borrow history
exports.getUserBorrowHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Borrow.findAll({
      where: { userId },
      include: [{ model: Book }],
      order: [['borrowDate', 'DESC']],
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch borrow history', error });
  }
};
