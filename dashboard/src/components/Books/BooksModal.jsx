import * as React from "react";
import { Box,Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FormDialog } from "../Page-changes/FormDialog";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch,useSelector } from "react-redux";
import { studentsTakenBook,returnBook } from "../../actions/books";
import {useAlert} from "react-alert"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// dynamically place content in modal
export default function BooksModal({ isOpen, onCloseModal, selectedRowId }) {
    
  const dispatch = useDispatch()
  const {students,loading1,message} = useSelector((state)=>state.book)
  const alert = useAlert()

  React.useEffect(()=>{
      dispatch(studentsTakenBook(selectedRowId))
  },[])

  React.useEffect(()=>{
    if(message){
      alert.success(message)
      dispatch({
        type:"clearMessages"
      })
    }
  },[message])

  const handleReturn = (studentId,e) =>{
    e.target.style.display = "none";
    dispatch(returnBook(studentId,selectedRowId))
    //onCloseModal()
  }

  const formComponent = () => {
    return (
      <div>
        <Typography variant="h4" align="center" marginBottom={3}>Students taken this book</Typography>
        <TableContainer>
        <Table sx={{ width: 1100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Issue Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Contact</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students && students.length > 0 ? 
              students.map((row,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" style={{display:'none'}}>
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.issueDate.slice(0,10)}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  {row.username ?
                    <>
                      <StyledTableCell align="right">{row?.username}</StyledTableCell>
                      <StyledTableCell align="right">{row?.email}</StyledTableCell>
                      <StyledTableCell align="right">{row?.contact}</StyledTableCell>
                    </> 
                    :
                    <StyledTableCell colSpan={2} align="right">Student record deleted</StyledTableCell>
                  }
                  
                  {
                    row.status === 'issued' && row.username ? 
                    <StyledTableCell align="right">
                      <Button onClick={(e)=>handleReturn(row._id,e)}>
                        Return
                      </Button>
                    </StyledTableCell>
                    :<StyledTableCell align="right"></StyledTableCell>
                  }
                </StyledTableRow>
              ))
              : 
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No students have taken this student
                </StyledTableCell>
              </StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
};

  // modal component
  return (
    <div>
      <FormDialog
        maxWidth="lg"
        fullWidth
        open={isOpen}
        onClose={(e) => onCloseModal(e, "backdropClick")}
        TransitionComponent={Transition}
        disableEscapeKeyDown
      >
        {/* close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0.5rem 0",
          }}
        >
          <IconButton
            edge="start"
            onClick={onCloseModal}
            aria-label="close"
            sx={{
              color: "primary.main",
              "& svg": { width: "1.2em", height: "1.2em" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* form */}
        {formComponent()}
      </FormDialog>
    </div>
  );
}
