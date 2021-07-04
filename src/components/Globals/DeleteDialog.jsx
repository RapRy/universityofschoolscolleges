import React from 'react'
import { Dialog, Button, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

const DeleteDialog = ({ status, message, handleDelete, handleCancel }) => {
    return (
        <Dialog open={status} onClose={handleCancel}>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
