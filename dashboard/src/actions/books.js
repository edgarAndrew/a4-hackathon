import axios from "axios"
import '../axios'
import { booksURL,lendingURL } from "../axios"

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
        const {data} = await axios.get(`${booksURL}/books/api/v1/book/${id}/`)
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
export const studentsTakenBook = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"StudentsTakenBookRequest"
        })
        const {data} = await axios.get(`${lendingURL}/lending/api/v2/students-taken/${id}`)
        dispatch({
            type:"StudentsTakenBookSuccess",
            payload:data.students
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"StudentsTakenBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const returnBook = (student,book)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ReturnBookRequest"
        })
        const {data} = await axios.post(`${lendingURL}/lending/api/v2/return`,{student,book},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"ReturnBookSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"ReturnBookFailure",
            payload:error.response.data.msg
        })
    }    
}
export const getAllIssues = (val=null)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllIssuesRequest"
        })
        let res = null
        if(val === 'issued'){
            const {data} = await axios.get(`${lendingURL}/lending/api/v2/?status=issued`)
            res = data
        }else if(val === 'returned'){
            const {data} = await axios.get(`${lendingURL}/lending/api/v2/?status=returned`)
            res = data
        }else{
            const {data} = await axios.get(`${lendingURL}/lending/api/v2/`)
            res = data
        }
       
        dispatch({
            type:"GetAllIssuesSuccess",
            payload:res.transactions
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetAllIssuesFailure",
            payload:error.response.data.msg
        })
    }    
}
export const getIssuesPassedDueDate = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllIssuesRequest"
        })

        const {data} = await axios.get(`${lendingURL}/lending/api/v2/passed-due`)
        
        dispatch({
            type:"GetAllIssuesSuccess",
            payload:data.transactions
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetAllIssuesFailure",
            payload:error.response.data.msg
        })
    }    
}