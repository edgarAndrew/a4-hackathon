const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {takeBook,returnBook,booksTakenByStudent,studentsTakenBook,getTransactions,notReturned} = require('../controllers/lending');

router.route('/').post(takeBook).get(authMiddleware,getTransactions)
router.route('/return').post(returnBook)
router.route('/passed-due').get(authMiddleware,notReturned)
router.route('/books-taken/:id').get(authMiddleware,booksTakenByStudent)
router.route('/students-taken/:id').get(authMiddleware,studentsTakenBook)

module.exports = router;