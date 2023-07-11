import React, { useEffect } from 'react'
import "../EditBook/EditBook.css"
import {Backdrop,Button,CircularProgress, Typography} from '@mui/material'
import {Done} from '@material-ui/icons'
import { getBook,editBook } from '../../../actions/books'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import { useParams } from 'react-router-dom'

const Editbook = () => {
    const dispatch = useDispatch()
    const {loading,message,error,book} = useSelector((state)=>state.book)
    const alert = useAlert()
    const {id} = useParams()

    useEffect(()=>{
      dispatch(getBook(id))
    },[])
    
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

    const handleUpdate = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get('title')
        const isbn = data.get('isbn')
        const author = data.get('author')
        const description = data.get('description')
        const quantity = data.get('quantity')
        dispatch(editBook(id,isbn,title,author,description,quantity))
    }


    if (!book)
      return (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      );
    else
    return (
      <div className='container'>
          
          <form onSubmit={handleUpdate}>
              <Typography variant='h4' align='center'>Edit Book</Typography>
              <div>
                  <label>ISBN</label>
                  <input name="isbn" defaultValue={book.isbn} type="text" required/>
              </div>
              <div>
                  <label>Title</label>
                  <input name="title" type="text" defaultValue={book.title} required/>
              </div>
              <div>
                  <label>Author</label>
                  <input name="author" type="text" defaultValue={book.author} required/>
              </div>
              <div>
                  <label>Quantity</label>
                  <input name="quantity" type="number" defaultValue={book.quantity} required/>
              </div>
              <div>
                  <label>Description</label>
                  <textarea name="description" defaultValue={book.description} cols="20" rows="5"></textarea>
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

export default Editbook