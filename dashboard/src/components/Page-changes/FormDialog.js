import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material";

// custom form modal
export const FormDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    overflow: "hidden",
  },
  "& .MuiPaper-root": {
    borderRadius: "14px",
    backgroundColor: theme.palette.ocean.background,
    padding: "1rem 2rem",
    height: "100%",
  },
  "& header.MuiPaper-root": {
    height: "20%",
  },
}));
