import * as React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FormDialog } from "../Page-changes/FormDialog";
import {booksByStudent} from '../../actions/students'
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// dynamically place content in modal
export default function StudentsModal({ isOpen, onCloseModal, selectedRowId }) {
    
    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(booksByStudent(selectedRowId))
    },[])

    const formComponent = () => {
    return <Typography variant="h6">Show list of books taken by student {selectedRowId}</Typography>;
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
