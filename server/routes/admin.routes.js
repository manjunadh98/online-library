const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/adminMiddleware');

// User Management
router.get('/users', adminMiddleware, adminController.getAllUsers);
router.delete('/users/:id', adminMiddleware, adminController.deleteUser);

// Book Management
router.post('/books', adminMiddleware, adminController.addBook);
router.put('/books/:id', adminMiddleware, adminController.updateBook);
router.delete('/books/:id', adminMiddleware, adminController.deleteBook);

module.exports = router;
