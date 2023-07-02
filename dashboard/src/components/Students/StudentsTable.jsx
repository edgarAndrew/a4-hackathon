import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {Edit,Delete,Refresh} from '@mui/icons-material'
import classes from "../Books/table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertDialog from '../Page-changes/AlertDialog'
import { allStudents,deleteStudent } from "../../actions/students";
import StudentsModal from "./StudentsModal";

const StudentsTable = ({isAdmin}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading,students } = useSelector((state) => state.student);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteId,setDeleteId] = useState(null)

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleOpen = (rowId) => {
    setSelectedRowId(rowId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) =>{
    navigate(`/students/edit/${id}`)
  }
  const handleRefresh = () =>{
    dispatch(allStudents())
  }
  const handleDelete = async() =>{
    await dispatch(deleteStudent(deleteId))
    await dispatch(allStudents())
  }

  // alert box states
  const handleAlertOpen = (id) => {
    setDeleteId(id)
    setAlertOpen(true);
  };
  const handleAlertClose = (res) => {
    setAlertOpen(false);
    if(res != "no"){
      handleDelete()
    }
  };

  return loading? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <Container className={classes.mainContainer} maxWidth="xl" sx={{ margin: "1rem 0" }}>
      <Button className='refresh' endIcon={<Refresh/>} onClick={handleRefresh}>
          Refresh
      </Button>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="contracts table">
          {/* --------- table header --------- */}
          <TableHead className={classes.tableHeader}>
            <TableRow className={classes.tableHeaderRow}>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Contact
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* --------- table body --------- */}
          <TableBody>
            {
                students && students.length>0 ? 
                students.map((row,index)=>{
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell align="center" style={{display:"none"}}>
                                <Typography className={classes.rowContent}>
                                {row._id}
                                </Typography>
                            </TableCell>
                            
                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.username}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.email}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.contact}
                                </Typography>
                            </TableCell>

                            <TableCell sx={{ maxWidth: "500px" }} align="center">
                                <div>
                                    {
                                      isAdmin ?
                                      <>
                                        <Button startIcon={<Edit/>} onClick={()=>handleEdit(row._id)}>
                                          Edit
                                        </Button>
                                        <Button startIcon={<Delete/>} onClick={()=>handleAlertOpen(row._id)}>
                                          Delete
                                        </Button>
                                      </> 
                                      :null
                                    }
                                    
                                    <AlertDialog
                                      isOpen={alertOpen}
                                      closeDialog={handleAlertClose}
                                    />
                                    <Button onClick={()=>handleOpen(row._id)}>
                                        Track
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })
              :<TableRow>
                <TableCell align="center" colSpan={6}>
                    <Typography className={classes.rowContent}>
                      No results found
                    </Typography>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
          <StudentsModal
            isOpen={open}
            onCloseModal={handleClose}
            selectedRowId={selectedRowId}
          />
      )}
    </Container>
  );
};

export default StudentsTable;
