import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material'
import Slide from '@mui/material/Slide';
import "./messages.css"

function TransitionBottom(props) {
    return <Slide {...props} direction="down" />;
}

export default function ErrorPopup({ message, onClose }) {
    let [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setOpen(Boolean(message))
    }, [message])

    let handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose()
        setOpen(false)
    }

    return <Snackbar
        className='error_popup'
        TransitionComponent={TransitionBottom}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        sx={{
            minWidth: '30vw'
        }}>
        <Alert severity='error' onClose={handleClose} sx={{ fontSize: '16pt', minWidth: '50vw' }} >
            <AlertTitle sx={{ fontSize: '18pt', fontWeight: 900 }}>Erreur</AlertTitle>
            {message}
        </Alert>
    </Snackbar>
}