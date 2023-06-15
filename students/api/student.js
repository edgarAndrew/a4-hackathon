const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {addStudent,getStudent,getAllStudents,updateStudent,removeStudent,searchStudent} = require('../controllers/student');

router.route('/').post(authMiddleware,addStudent).get(authMiddleware,getAllStudents)
router.route('/search').get(authMiddleware,searchStudent)
router.route('/:id').get(authMiddleware,getStudent).patch(authMiddleware,updateStudent).delete(authMiddleware,removeStudent)

module.exports = router;