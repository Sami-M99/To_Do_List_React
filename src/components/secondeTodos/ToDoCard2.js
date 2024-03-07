import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from 'react';
import { ToDosContext2 } from './contexts/ToDosContext2';
import "../../App.css"

export default function ToDoCard2({todo, openDeleteDialog, openUpdateDialog, message}) {
    // الذي انشأناه toDosReducer الخاص بال Context هنا استخدمنا ال 
    // {toDosR, dispatch} فقط بدلا من استخراج dispatch واستخرجنا ال
    const {dispatch}= useContext(ToDosContext2);

    function handleIsCompleted(){
        dispatch({type: "IsCompletedTask", payload: todo})
        // يعرض رسالة باتمام المهمة او لا
        message(!todo.isCompleted? "Task Completed" : "Task In Progress");
    }

    //! الى اللست لكي تتم عملية الحذف او التعديل todo الغرض الأساسي من هذه الدوال هو ارسال المهمة الحالية الذي نحن بها
    function handleClickOpenDelete() {
        openDeleteDialog(todo);
    };
    const handleClickOpenUpdate = () => {
        openUpdateDialog(todo);
    };


    return (
        <Card className={"ToDoCard"} 
            variant="outlined" 
            style={{textAlign:"left", backgroundColor:(todo.isCompleted)?  "#5f5a5a":"#1e005d" , color: "white"}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography  style={{textDecoration : (todo.isCompleted)? "line-through" : "none" }}>
                            {todo.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#ccc"}} gutterBottom>
                            {todo.details}
                        </Typography>
                    </Grid> 

                    <Grid item xs={4} display={'flex'} justifyContent={'space-between'}>
                        <IconButton 
                            className='iconButton' 
                            aria-label="delete"
                            sx={{
                                color: todo.isCompleted ? "white" : "#8bc333", 
                                background: todo.isCompleted ? "#8bc333" : "white",
                                border: "solid 2px #8bc333"
                                }}
                            onClick={handleIsCompleted}
                        >                        
                            <DoneIcon />
                        </IconButton>

                        <IconButton onClick={handleClickOpenUpdate} className='iconButton' aria-label="delete" sx={{color: "#0d65c1", background: "white", border: "solid 2px #0d65c1"}}>
                            <EditIcon />                        
                        </IconButton>
                        {/*الى ملف اللست <UpdateTask2 /> تم نقل ال */}

                        <IconButton onClick={handleClickOpenDelete}  className='iconButton' aria-label="delete" sx={{color: "#e92c2c", background: "white", border: "solid 2px #db0c0c"}}>
                            <DeleteForeverIcon/>                        
                        </IconButton>
                        {/*الى ملف اللست <DeleteTask2 /> تم نقل ال */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}