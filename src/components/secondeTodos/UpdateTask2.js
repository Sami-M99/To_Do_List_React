import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { ToDosContext2 } from './contexts/ToDosContext2';

export default function UpdateTask2({open, handleClose, todo, setTodo, message}) {
    //لانه صارت تعيق عملية التحديث بتاخيرها ارسال البيانات لمربعات الادخال updateTask هنا نلاحظ اننا حذفنا الستايت
    // Context وكذلك صار لها بديل وهو ال 
    const {dispatch}= useContext(ToDosContext2);

    function handleUpdateTask(){
        // Reducer تم استدعاالامر المنطقي المتعلة بتحديث المهمة من ال 
        dispatch({ type: "UpdateTask", payload: todo })
        // لاظهار رسالة ان عملية التعديل تمت بنجاح  
        message("Task Updated")
    }
    
    function handleCancel(){
        handleClose();
    }

    return (
    <React.Fragment>
        <Dialog
        open={open}
        onClose={handleCancel}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                handleCancel();
            },
        }}
        >
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <TextField
                margin="dense"
                label="Task Title"
                type="title"
                fullWidth
                variant="standard"
                // لازم علاامة الاستفهام ؟ لكي تمنع الخطأ عندما يكون المتغير فاضي
                value= {todo?.title}
                onChange={(event) => setTodo({...todo,title:event.target.value}) }
                />
                <TextField
                margin="dense"
                label="Task Details"
                type="details"
                fullWidth
                variant="standard"
                value= {todo?.details}
                onChange={(event) => setTodo({...todo, details: event.target.value}) }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} style={{color: "gray"}}>Cancel</Button>
                <Button type="submit" onClick={handleUpdateTask} style={{color: "#055aad"}}>Update</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}