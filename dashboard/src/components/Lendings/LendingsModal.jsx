import * as React from "react";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FormDialog } from "../Page-changes/FormDialog";
import { useDispatch, useSelector } from "react-redux";
import "../Books/EditBook/EditBook.css"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// dynamically place content in modal
export default function LendingsModal({ isOpen, onCloseModal, entity,entityId }) {
    
    const dispatch = useDispatch()
    const {student} = useSelector((state)=>state.student)
    const {book} = useSelector((state)=>state.book)


    const formComponent = (entity) => {
        return (
            entity === 'student' ? 
            <div className='container'>
                {student ? 
                     <form>
                     <Typography variant='h4' align='center'>Student Details</Typography>
                     <div>
                         <label>Student ID</label>
                         <input name="isbn" value={student?._id} type="text" disabled={true} required/>
                     </div>
                     <div>
                         <label>Name</label>
                         <input name="username" type="text" value={student?.username} required/>
                     </div>
                     <div>
                         <label>Email</label>
                         <input name="email" type="email" value={student?.email} required/>
                     </div>
                     <div>
                         <label>Contact</label>
                         <input name="contact" type="tel" value={student?.contact} required/>
                     </div>
                 </form>
                :<form>
                    <Typography variant="h6">Entity does not exist anymore</Typography>
                </form>
                }
            </div>
        :
        <div className='container'>
            {
                book ? 
                <form>
                <Typography variant='h4' align='center'>Book Details</Typography>
                <div>
                    <label>ISBN</label>
                    <input name="isbn" value={book?.isbn} type="text" required/>
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" type="text" value={book?.title} required/>
                </div>
                <div>
                    <label>Author</label>
                    <input name="author" type="text" value={book?.author} required/>
                </div>
                <div>
                    <label>Quantity</label>
                    <input name="quantity" type="number" value={book?.quantity} required/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={book?.description} cols="20" rows="5"></textarea>
                </div>
            </form>
            :<form>
                <Typography variant="h6">Entity does not exist anymore</Typography>
            </form>
            }
            
        </div>
        )
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
        {formComponent(entity)}
      </FormDialog>
    </div>
  );
}
