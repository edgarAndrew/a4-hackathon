const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {addBook,updateBook,removeBook,getBook,getAllBooks,searchBook} = require('../controllers/book');

router.route('/').post(authMiddleware,addBook).get(getAllBooks)
router.route('/search').get(searchBook)
router.route('/:id').get(getBook).patch(authMiddleware,updateBook).delete(authMiddleware,removeBook)

module.exports = router;