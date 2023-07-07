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
import {Refresh} from '@mui/icons-material'
import classes from "../Books/table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllIssues, getBook } from "../../actions/books";
import LendingsModal from "./LendingsModal";
import { getStudent } from "../../actions/students";

const LendingsTable = () => {
  const dispatch = useDispatch()
  const { loading,issues } = useSelector((state) => state.book);

  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState(null);
  const [entityId, setEntityId] = useState(null);

  const handleOpen = (entityId,entity) => {
    setEntity(entity)
    setEntityId(entityId)

    if(entity === 'student')
        dispatch(getStudent(entityId))
    else
        dispatch(getBook(entityId))
        
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () =>{
    dispatch(getAllIssues())
  }


  return loading? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <Container className={classes.mainContainer} maxWidth="xl" sx={{ margin: "1rem 0" }}>
      <Button className='refresh' endIcon={<Refresh/>} onClick={()=>handleRefresh()}>
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
                SR.no
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Issue Date
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Due Date
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px", maxWidth: "300px" }}
                className={classes.tableHeaderCell}
              >
                Status
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
                issues && issues.length>0 ? 
                issues.map((row,index)=>{
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell align="center" style={{display:"none"}}>
                                <Typography className={classes.rowContent}>
                                {row._id}
                                </Typography>
                            </TableCell>
                            
                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {index+1}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.issueDate.slice(0,10)}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.dueDate.slice(0,10)}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography className={classes.rowContent}>
                                {row.status}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ maxWidth: "500px" }} align="center">
                                <div>
                                    <Button onClick={()=>handleOpen(row.student,'student')}>
                                        View Student
                                    </Button>
                                    <Button onClick={()=>handleOpen(row.book,'book')}>
                                        View Book
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
          <LendingsModal
            isOpen={open}
            onCloseModal={handleClose}
            entity={entity}
            entityId={entityId}
          />
      )}
    </Container>
  );
};

export default LendingsTable;
