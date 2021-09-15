import React from "react";
import {
  Dialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  ThemeProvider,
} from "@material-ui/core";

import { poppinsFont } from "../../theme/themes";

const DeleteDialog = ({ status, message, handleDelete, handleCancel }) => {
  return (
    <Dialog open={status} onClose={handleCancel}>
      <ThemeProvider theme={poppinsFont}>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

export default DeleteDialog;
