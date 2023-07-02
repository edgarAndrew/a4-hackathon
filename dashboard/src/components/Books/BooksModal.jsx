import * as React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FormDialog } from "../Page-changes/FormDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// dynamically place content in modal
export default function BooksModal({ isOpen, onCloseModal, selectedRowId }) {
  const formComponent = () => {
    return <Typography variant="h6">Show list of students who have taken this book {selectedRowId}</Typography>;
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
