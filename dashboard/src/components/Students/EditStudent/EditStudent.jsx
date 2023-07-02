import React, { useEffect } from 'react'
import "../../Books/EditBook/EditBook.css"
import {Backdrop,Button,CircularProgress, Typography} from '@mui/material'
import {Done} from '@material-ui/icons'
import { getStudent,editStudent } from '../../../actions/students'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import { useParams } from 'react-router-dom'

const EditStudent = () => {
    const dispatch = useDispatch()
    const {loading,message,error,student} = useSelector((state)=>state.student)
    const alert = useAlert()
    const {id} = useParams()

    useEffect(()=>{
      dispatch(getStudent(id))
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
        const email = data.get('email')
        const username = data.get('username')
        const contact = data.get('contact')
        dispatch(editStudent(id,email,username,contact))
    }


    if (!student)
      return (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      );
    else
    return (
      <div className='container'>
          
          <form onSubmit={handleUpdate}>
              <Typography variant='h4' align='center'>Edit Student</Typography>
              <div>
                  <label>Student ID</label>
                  <input name="isbn" value={id} type="text" disabled={true} required/>
              </div>
              <div>
                  <label>Name</label>
                  <input name="username" type="text" defaultValue={student.username} required/>
              </div>
              <div>
                  <label>Email</label>
                  <input name="email" type="email" defaultValue={student.email} required/>
              </div>
              <div>
                  <label>Contact</label>
                  <input name="contact" type="tel" defaultValue={student.contact} required/>
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

export default EditStudent