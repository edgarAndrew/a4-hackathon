import React,{useState} from 'react'
import './Students.css'
import { useEffect } from 'react';
import {allStudents,searchStudent} from '../../actions/students'
import StudentsTable from './StudentsTable';
import { useDispatch,useSelector } from 'react-redux';
import {Backdrop,Button,CircularProgress, Typography} from '@mui/material'
import {useAlert} from 'react-alert'
import {useNavigate} from "react-router-dom"

const Students = () => {
  const dispatch = useDispatch()  
  const {loading,message} = useSelector((state)=>state.student)
  const {profile} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const alert = useAlert()

  useEffect(()=>{
    dispatch(allStudents())
  },[])

  useEffect(()=>{
    if(message){
      alert.success(message)
      dispatch({type:"clearMessages"})
    }
  },[message])

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam, setSearchParam] = useState("username");

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchStudent(searchParam,searchTerm))
  };

  return (
    <div className='books'>
      <Typography variant='h4' align='center'>Students</Typography>
      <form className="searchContainer" onSubmit={handleSearch}>
        <select
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            className="searchSelect"
          >
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="contact">Contact</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Name,Email,Contact"
          className="searchInput"
          required
        />
        <button type='submit' className='searchButton'>
          <Typography>
            Search
          </Typography>
        </button>
      </form>

      {
        profile?.isAdmin ? 
        <Button variant='outlined' onClick={()=>navigate('/students/add')}>
          <Typography variant='h7'>
            Add Student
          </Typography>
        </Button>
      :null
      }
      
      <StudentsTable isAdmin={profile.isAdmin}/>
    </div>
  )
}

export default Students