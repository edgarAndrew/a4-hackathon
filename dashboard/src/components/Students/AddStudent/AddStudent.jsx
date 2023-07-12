import React, { useEffect } from 'react'
import "../AddStudent/AddStudent.css"
import {Button,Typography} from '@mui/material'
import {Done} from '@material-ui/icons'
import { addStudent } from '../../../actions/students'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'

const AddStudent = () => {
    const dispatch = useDispatch()
    const {loading,message,error} = useSelector((state)=>state.student)
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
        const username = data.get('username')
        const email = data.get('email')
        const contact = data.get('contact')
        const password = data.get('password')
        dispatch(addStudent(email,username,password,contact))
    }
    
  return (
    <div className='container'>
        
        <form onSubmit={handleAdd}>
            <Typography variant='h4' align='center'>Add Student</Typography>
            <div>
                <label>Name</label>
                <input name="username" type="text" placeholder='John Smith...' required/>
            </div>
            <div>
                <label>Email</label>
                <input name="email" type="email" placeholder='john@gmail...' required/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" required/>
            </div>
            <div>
                <label>Contact</label>
                <input name="contact" type="tel" required/>
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

export default AddStudent