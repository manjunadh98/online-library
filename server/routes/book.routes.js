// routes/book.routes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

// Public: anyone can fetch books
router.get('/', bookController.getAllBooks);

// Admin-only routes
router.post('/', authenticate, isAdmin, bookController.addBook);
router.put('/:id', authenticate, isAdmin, bookController.updateBook);
router.delete('/:id', authenticate, isAdmin, bookController.deleteBook);

module.exports = router;
