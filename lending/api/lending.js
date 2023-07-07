const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {takeBook,returnBook,booksTakenByStudent,studentsTakenBook,
    getTransactions,notReturned,getTotalIssues,getBooksIssuedByMonth} = require('../controllers/lending');

router.route('/').post(takeBook).get(authMiddleware,getTransactions)
router.route('/graph').get(authMiddleware,getBooksIssuedByMonth)
router.route('/count').get(authMiddleware,getTotalIssues)
router.route('/return').post(authMiddleware,returnBook)
router.route('/passed-due').get(authMiddleware,notReturned)
router.route('/books-taken/:id').get(authMiddleware,booksTakenByStudent)
router.route('/students-taken/:id').get(authMiddleware,studentsTakenBook)

module.exports = router;