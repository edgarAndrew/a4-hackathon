import React, { useEffect,useState } from 'react'
import "./Issue.css"
import {Button,Typography} from '@mui/material'
import {Done} from '@material-ui/icons'
import { searchBook,issueBook } from '../../actions/books'
import {searchStudent} from '../../actions/students'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'

const Issue = () => {
    const dispatch = useDispatch()
    
    const {loading,message,error,books} = useSelector((state)=>state.book)
    const {students} = useSelector((state)=>state.student)
    
    const [bookInput, setBookInput] = useState('');
    const [studentInput, setStudentInput] = useState('');
    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    
    const [booksVisible,setBooksVisible] = useState(false)
    const [studentsVisible,setStudentsVisible] = useState(false)

    
    const alert = useAlert()
    
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
          }
          if (message) {
            alert.success(message);
            dispatch({ type: "clearMessages" });
          }
    },[dispatch,message,error])

    const handleBookSearch = (e) => {
      setBooksVisible(true)
      const { value } = e.target;
      setBookInput(value);
      dispatch(searchBook('title', value));
    };
  
    const handleStudentSearch = (e) => {
      setStudentsVisible(true)
      const { value } = e.target;
      setStudentInput(value);
      dispatch(searchStudent('username', value));
    };
  
    const handleBookSelect = (book) => {
      setBookInput(book.title);
      setBookId(book._id)
      setBooksVisible(false)
    };
  
    const handleStudentSelect = (student) => {
      setStudentInput(student.username);
      setStudentId(student._id)
      setStudentsVisible(false)
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(issueBook(studentId,bookId))
    }

    return (
      <div className='container'>
          
          <form onSubmit={handleSubmit}>
              <Typography variant='h4' align='center'>Issue Book</Typography>
              <div>
                  <div>
                    <label>Book Name</label>
                    <input
                      name="book"
                      type="text"
                      value={bookInput}
                      onChange={handleBookSearch}
                      required
                    />
                  </div>
                  {
                    books && books.length > 0 && booksVisible && (
                      <ul>
                        {
                          books.map((book) => (
                            <li key={book._id} onClick={() => handleBookSelect(book)}>
                              {book.title}
                            </li>
                          ))
                        }
                      </ul>
                    )
                  }
              </div>
              <div>
                  <div>
                    <label>Student</label>
                    <input
                      name="student"
                      type="text"
                      value={studentInput}
                      onChange={handleStudentSearch}
                      required
                    />
                  </div>
                  {
                    students && students.length > 0 && studentsVisible && (
                      <ul>
                        {
                          students.map((student) => (
                            <li key={student._id} onClick={() => handleStudentSelect(student)}>
                              {student.username}
                            </li>
                          ))
                        }
                      </ul>
                    )
                  }
              </div>
              <Button type='submit' variant='outlined' startIcon={<Done/>} disabled={loading}>
                  <Typography variant='h7'>
                      Done
                  </Typography>
              </Button>
          </form>
      </div>
    )
}

export default Issue