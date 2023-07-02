import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {useDispatch} from 'react-redux'

// Yes/No Dialog Box, returns the user's reponse where component is called

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "250px",
  },
  "& .MuiDialogContent-root p": {
    fontWeight: 600,
    width: "100%",
    textAlign: "center",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}));

export default function AlertDialog({ isOpen, closeDialog, id=null }) {
  
  const dispatch = useDispatch()
  const handleDelete = () => {
    closeDialog("yes", id);
  };

  return (
    <CustomDialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog.bind(null, "no")} sx={{ backgroundColor: "ocean.light" }}>
          No
        </Button>
        <Button
          onClick={handleDelete}
          sx={{ backgroundColor: red[100], color: red[800] }}
        >
          Yes
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}
