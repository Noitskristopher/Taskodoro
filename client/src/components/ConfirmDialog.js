import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ dialogOpen = false, dialogClose, dialogOnConfirm }) => {

    return (
        <div>
            <Dialog open={dialogOpen} onClose={dialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete all tasks?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color='primary'>Cancel</Button>
                    <Button onClick={dialogOnConfirm} color='primary'>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmDialog;
