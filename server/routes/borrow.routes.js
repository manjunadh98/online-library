const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrow.controller');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, borrowController.borrowBook);
router.post('/return', authenticate, borrowController.returnBook);
router.get('/history', authenticate, borrowController.getUserBorrowHistory);

module.exports = router;
