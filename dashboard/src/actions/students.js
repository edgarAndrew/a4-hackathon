import axios from "axios"
import '../axios'
import { studentURL,lendingURL } from "../axios"

export const allStudents = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllStudentsRequest"
        })
        const {data} = await axios.get(`${studentURL}/students/api/v1/student`)
        dispatch({
            type:"GetAllStudentsSuccess",
            payload:data.students
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetAllStudentsFailure",
            payload:error.response.data.msg
        })
    }    
}
export const getStudent = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetStudentRequest"
        })
        const {data} = await axios.get(`${studentURL}/students/api/v1/student/${id}`)
        dispatch({
            type:"GetStudentSuccess",
            payload:data.student
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"GetStudentFailure",
            payload:error.response.data.msg
        })
    }    
}
export const addStudent = (email,username,password,contact,image=null)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddStudentRequest"
        })
        const {data} = await axios.post(`${studentURL}/students/api/v1/student`,{email,username,password,contact,image},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddStudentSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddStudentFailure",
            payload:error.response.data.msg
        })
    }    
}
export const editStudent = (id,email,username,contact)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateStudentRequest"
        })
        const {data} = await axios.patch(`${studentURL}/students/api/v1/student/${id}`,{email,username,contact},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdateStudentSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"UpdateStudentFailure",
            payload:error.response.data.msg
        })
    }    
}
export const searchStudent = (param,value)=>async(dispatch)=>{
    try {
        dispatch({
            type:"SearchStudentRequest"
        })
        let res = null
        if(param === 'email'){
            const {data} = await axios.get(`${studentURL}/students/api/v1/student/search?email=${value}`);
            res = data
        }else if(param === 'username'){
            const {data} = await axios.get(`${studentURL}/students/api/v1/student/search?username=${value}`);
            res = data
        }
        else{
            const {data} = await axios.get(`${studentURL}/students/api/v1/student/search?contact=${value}`)
            res = data
        }
        dispatch({
            type:"SearchStudentSuccess",
            payload:res.student
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"SeachStudentFailure",
            payload:error.response.data.msg
        })
    }    
}
export const deleteStudent = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RemoveStudentRequest"
        })
        const {data} = await axios.delete(`${studentURL}/students/api/v1/student/${id}`)
        dispatch({
            type:"RemoveStudentSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RemoveStudentFailure",
            payload:error.response.data.msg
        })
    }    
}
export const booksByStudent = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"StudentBooksRequest"
        })
        const {data} = await axios.get(`${lendingURL}/lending/api/v2/books-taken/${id}`)
        console.log(data)
        dispatch({
            type:"StudentBooksSuccess",
            payload:data.books
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"StudentBooksFailure",
            payload:error.response.data.msg
        })
    }    
}