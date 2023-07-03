import React,{useState} from 'react'
import './Books.css'
import { useEffect } from 'react';
import {allBooks,searchBook} from '../../actions/books'
import { useDispatch,useSelector } from 'react-redux';
import {Backdrop,Button, Typography} from '@mui/material'
import BooksTable from './BooksTable';
import {useAlert} from 'react-alert'
import {useNavigate} from "react-router-dom"

const Books = () => {
  const dispatch = useDispatch()  
  const {loading,message} = useSelector((state)=>state.book)
  const navigate = useNavigate()
  const alert = useAlert()
  

  useEffect(()=>{
    dispatch(allBooks())
  },[])

  useEffect(()=>{
    if(message){
      alert.success(message)
      dispatch({type:"clearMessages"})
    }
  },[message])

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam, setSearchParam] = useState("title");

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchBook(searchParam,searchTerm))
  };

  return (
    <div className='books'>
      <Typography variant='h4' align='center'>Books</Typography>
      <form className="searchContainer" onSubmit={handleSearch}>
        <select
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            className="searchSelect"
          >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Title,Author"
          className="searchInput"
          required
        />
        <button type='submit' className='searchButton'>
          <Typography>
            Search
          </Typography>
        </button>
      </form>
      <Button variant='outlined' onClick={()=>navigate('/books/add')}>
        <Typography variant='h7'>
          Add Book
        </Typography>
      </Button>
      <BooksTable/>
    </div>
  )
}

export default Books