import React, { useEffect } from 'react'
import "./Addbook.css"
import {Backdrop,Button,CircularProgress, Typography} from '@mui/material'
import {Done} from '@material-ui/icons'
import { addBook } from '../../../actions/books'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'

const Addbook = () => {
    const dispatch = useDispatch()
    const {loading,message,error} = useSelector((state)=>state.book)
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

    const handleAdd = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get('title')
        const isbn = data.get('isbn')
        const author = data.get('author')
        const description = data.get('description')
        const quantity = data.get('quantity')
        dispatch(addBook(isbn,title,author,description,quantity))
    }
    
  return (
    <div className='container'>
        
        <form onSubmit={handleAdd}>
            <Typography variant='h4' align='center'>Add Book</Typography>
            <div>
                <label>ISBN</label>
                <input name="isbn" type="text" placeholder='978-93...' required/>
            </div>
            <div>
                <label>Title</label>
                <input name="title" type="text" placeholder='Let Us C...' required/>
            </div>
            <div>
                <label>Author</label>
                <input name="author" type="text" placeholder='Yashwant Kanetkar...' required/>
            </div>
            <div>
                <label>Quantity</label>
                <input name="quantity" type="number" placeholder='10...' required/>
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" placeholder='Fantastic book to learn C programming...' cols="20" rows="5"></textarea>
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

export default Addbook