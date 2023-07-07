import React,{useState} from 'react'
import './Lendings.css'
import { useEffect } from 'react';
import LendingsTable from './LendingsTable';
import { useDispatch,useSelector } from 'react-redux';
import {Typography} from '@mui/material'
import { getAllIssues,getIssuesPassedDueDate } from '../../actions/books';

const Lendings = () => {
  const dispatch = useDispatch()  

  useEffect(()=>{
    dispatch(getAllIssues())
  },[])

  const [filterTerm, setFilterTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    if(filterTerm === 'passed'){
      dispatch(getIssuesPassedDueDate())
    }else
      dispatch(getAllIssues(filterTerm))
  };

  return (
    <div className='books'>
      <Typography variant='h4' align='center'>Lendings</Typography>
      <form className="searchContainer" onSubmit={handleSearch}>
        <div className='searchInput'>
          <input type="radio" name="filter" onChange={()=>{setFilterTerm("issued")}}/>
          <Typography Typography variant='h7'>Issued</Typography>
        </div>
        <div className='searchInput'>
          <input type="radio" name="filter" onChange={()=>setFilterTerm("returned")}/>
          <Typography variant='h7'>Returned</Typography>
        </div>
        <div className='searchInput'>
          <input type="radio" name="filter" onChange={()=>setFilterTerm("passed")}/>
          <Typography variant='h7'>Passed Due Date</Typography>
        </div>
        <button type='submit' className='searchButton'>
          <Typography>
            Apply
          </Typography>
        </button>
      </form>
      <LendingsTable/>      
    </div>
  )
}

export default Lendings