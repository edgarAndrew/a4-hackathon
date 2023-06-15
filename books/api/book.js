const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {addBook,updateBook,removeBook,getBook,getAllBooks,searchBook} = require('../controllers/book');

router.route('/').post(authMiddleware,addBook).get(authMiddleware,getAllBooks)
router.route('/search').get(authMiddleware,searchBook)
router.route('/:id').get(authMiddleware,getBook).patch(authMiddleware,updateBook).delete(authMiddleware,removeBook)

module.exports = router;