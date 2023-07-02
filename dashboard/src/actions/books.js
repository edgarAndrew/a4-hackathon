import axios from "axios"
import '../axios'
import { booksURL } from "../axios"

export const allBooks = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllBooksRequest"
        })
        const {data} = await axios.get(`${booksURL}/books/api/v1/book`)
        dispatch({
            type:"GetAllBooksSuccess",
            payload:data.books
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetAllBooksFailure",
            payload:error.response.data.msg
        })
    }    
}
export const getBook = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetBookRequest"
        })
        const {data} = await axios.get(`${booksURL}/books/api/v1/book/${id}`)
        dispatch({
            type:"GetBookSuccess",
            payload:data.book
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const addBook = (isbn,title,author,description,quantity)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddBookRequest"
        })
        const {data} = await axios.post(`${booksURL}/books/api/v1/book`,{isbn,title,author,description,quantity},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddBookSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const editBook = (id,isbn,title,author,description,quantity)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateBookRequest"
        })
        const {data} = await axios.patch(`${booksURL}/books/api/v1/book/${id}`,{isbn,title,author,description,quantity},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdateBookSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"UpdateBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const searchBook = (param,value)=>async(dispatch)=>{
    try {
        dispatch({
            type:"SearchBookRequest"
        })
        console.log(param,value)
        let res = null
        if(param === 'title'){
            const {data} = await axios.get(`${booksURL}/books/api/v1/book/search?title=${value}`);
            res = data
        }else{
            const {data} = await axios.get(`${booksURL}/books/api/v1/book/search?author=${value}`)
            res = data
        }
        console.log(param,value)
        dispatch({
            type:"SearchBookSuccess",
            payload:res.book
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"SeachBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const deleteBook = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RemoveBookRequest"
        })
        const {data} = await axios.delete(`${booksURL}/books/api/v1/book/${id}`)
        dispatch({
            type:"RemoveBookSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RemoveBookFailure",
            payload:error.response.data.msg
        })
    }    
}