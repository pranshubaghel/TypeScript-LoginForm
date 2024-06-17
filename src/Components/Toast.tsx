import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Snackbar } from '@mui/material';

interface ToastState {
    open: boolean;
    snackbaropen: boolean;
    snackbarmessage: string;
}

class Toast extends Component<{}, ToastState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            open: false,
            snackbaropen: false,
            snackbarmessage: ""
        };
    }
    handleClickopen = () => {
        this.setState({ open: true });
    }
    handleCancel = () => {
        this.setState({ open: false, snackbaropen: true, snackbarmessage: "cancel" })
        console.log("cancel")
    }
    handleConfirm = () => {
        this.setState({ open: false, snackbaropen: true, snackbarmessage: "confirm" })
        console.log("confirm")
    }
    handleSnackbarClose = () => {
        this.setState({ snackbaropen: false })
    }

    render() {
        return (
            <div>
                <Typography variant='h5'>Toast</Typography>
                <Button variant="outlined" color="primary" onClick={this.handleClickopen}>Open</Button>
                <Dialog open={this.state.open} onClose={this.handleCancel}>
                    <DialogTitle>Toast</DialogTitle>
                    <DialogContent><Typography>this is the some of information of toast </Typography></DialogContent>
                    <DialogActions>
                        <button onClick={this.handleCancel} color='primary'>Cancel</button>
                        <button onClick={this.handleConfirm} color='primary'>Confirm</button>
                    </DialogActions>

                </Dialog>
                <Snackbar
                    open={this.state.snackbaropen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    message={this.state.snackbarmessage}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    
                />
            </div>


        )
    }
}

export default Toast;
