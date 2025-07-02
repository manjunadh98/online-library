const db = require('../models');
const User = db.User;
const Book = db.Book;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const newBook = await Book.create({ title, author, description });
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const bookId = req.params.id;

    const updated = await Book.update(
      { title, author, description },
      { where: { id: bookId } }
    );
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.destroy({ where: { id: bookId } });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete book' });
  }

  // Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting admin
    const user = await db.User.findByPk(id);
    if (user.role === 'admin') {
      return res.status(403).json({ message: "You can't delete an admin user" });
    }

    await db.User.destroy({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

};
