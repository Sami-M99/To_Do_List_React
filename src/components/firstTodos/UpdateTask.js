import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useContext } from 'react';
import { ToDosContext } from './contexts/ToDosContext';

// Material UI من ال  FormDialog Modal هنا استعنا ب
// وهي تقوم باظهار نافذة منبثقة عند التعديل على النهنة
export default function UpdateTask({open, handleClose, todo}) {
    // للعنوان والتفاصيل من اجل اظهارها بمربع الادخال وتمكين التعديل عليها State عملنا 
    const [updateTask, setUpdateTask] = useState({title: todo.title, details: todo.details });

    // للتعديل عليها Context هنا كمان استدعينا البيانات العامة 
    const {toDos, setToDos} = useContext(ToDosContext);

    function handleUpdateTask(){
        const updated = toDos.map((el) => {
            if(el.id === todo.id){
                el.title = updateTask.title;
                el.details = updateTask.details;
            }
            return el;
        })
        setToDos(updated);

        // local Storage هنا عملنا كتابة لعملية تعديل المهمة في 
        localStorage.setItem("toDoStorage", JSON.stringify(updated));
    }
    
    // هذه الدالة لكي تحذف البيانات المعدلة عند عدم التحديث وتعيدها الى شكلها الأصلي وتعمل خروج من النافذة أيضا
    function handleCancel(){
        handleClose();
        setUpdateTask({title: todo.title, details: todo.details });
    }

    return (
    <React.Fragment>
        <Dialog
        open={open}
        onClose={handleCancel}
        PaperProps={{
            // من أجل اغلاق النافذة المنبثقة بعد التحديث
            component: 'form',
            onSubmit: (event) => {
                // Submit من أجل ما يعمل اعادة تحميل للصفحة عند الارسال
                event.preventDefault();
                handleCancel();
            },
        }}
        >
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                {/* مربعات الادخال  */}
                <TextField
                margin="dense"
                label="Task Title"
                type="title"
                fullWidth
                variant="standard"
                // من اجل اظهار البيانات الموجودة مسبقا وتمكين التعديل عليها 
                value= {updateTask.title}
                onChange={(event) => setUpdateTask({title:event.target.value, details: updateTask.details}) }
                />
                <TextField
                margin="dense"
                label="Task Details"
                type="details"
                fullWidth
                variant="standard"
                // من اجل اظهار البيانات الموجودة مسبقا وتمكين التعديل عليها 
                value= {updateTask.details}
                onChange={(event) => setUpdateTask({title: updateTask.title, details: event.target.value}) }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} style={{color: "gray"}}>Cancel</Button>
                {/* زر التعديل على البيانات  */}
                <Button type="submit" onClick={handleUpdateTask} style={{color: "#055aad"}}>Update</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}