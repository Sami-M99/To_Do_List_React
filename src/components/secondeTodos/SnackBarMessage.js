import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

//! تُستخدم للإخطارات المختصرة والرسائل التوضيحية للعمليات التي تم تنفيذها Snackbars (Toasts)
export default function SnackBarMessage({open, setOpen, message}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    return (
        <Snackbar 
            open={open} 
            onClose={handleClose}
            // لعمل حركة اظهار الرسالة من اسفل لاعلى
            TransitionComponent= {Slide}
            // autoHideDuration={2000} 
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                {/* وهنا حددنا الرسالة الذي راح تظهر بحسب العملية الذي تمت  */}
                {message}
                </Alert>
        </Snackbar>
    );
}