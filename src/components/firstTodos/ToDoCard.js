import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Hooks & Components
import { useContext } from 'react';
import { useState } from 'react';
import { ToDosContext } from './contexts/ToDosContext';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

// CSS file
import "../../App.css"


export default function ToDoCard({todo}) {
    // للتعديل عليها Context هنا كمان استدعينا البيانات العامة 
    const {toDos, setToDos} = useContext(ToDosContext);

    // يا تمت يا لا  isCompleted هنا دالة لتغيير حلة تمام المهمة  
    function handleIsCompleted(){
        let updatedTask = toDos.map((el) => {
            if(el.id === todo.id) { el.isCompleted = !todo.isCompleted ;}
            return el;
        })

        setToDos(updatedTask);

        // local Storage هنا عملنا كتابة لحالة تمام المهمة بال 
        localStorage.setItem("toDoStorage", JSON.stringify(updatedTask));
    }

    /* ==== Delete Task ==== */
    // هذه الستايت للنافذة المنبثقة عند الحذف
    const [openDelete, setOpenDelete] = useState(false);
    function handleClickOpenDelete() {
      setOpenDelete(true);
    };
    const handleCloseDelete = () => {
      setOpenDelete(false);

      setToDos(toDos);
    };
    // setToDos ومن ثم نعدلها بال todo مع المهمة الحالية toDos وهذه دالة حذف المهام وتعمل بفلترة المهام كاملة 
    function deleteElement() {
        const deletedTask = toDos.filter((el) => {
            return el.id !== todo.id;
        });

        setToDos(deletedTask);

        // local Storage هنا عملنا كتابة لعملية حذف المهمة بال 
        localStorage.setItem("toDoStorage", JSON.stringify(deletedTask));
    }

    /* ==== Update Task ==== */
    // هذه الستايت للنافذة المنبثقة عند النعديل على المهمة
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleClickOpenUpdate = () => {
      setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };

  return (
    <Card className={"ToDoCard"} 
        variant="outlined" 
        style={{textAlign:"left", backgroundColor:(todo.isCompleted)?  "#5f5a5a":"#1e005d" , color: "white"}}>
        <CardContent>
        {/* لانه يقسم المساحة الموجودة الى 12 عمود ونحن نتحكم بالأعمدة الى كم تنقسم وكم المسافات بينها  Grid استتخدمنا ال  */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {/* هنا عملنا ستايل بخط على عنوان المهمة المنجزة  */}
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
                        // هنا يغير لنا لون الزر عند الضغط عليه 
                        sx={{
                            color: todo.isCompleted ? "white" : "#8bc333", 
                            background: todo.isCompleted ? "#8bc333" : "white",
                            border: "solid 2px #8bc333"
                            }}
                        // هنا عند الضغط على زر اتمام المهمة فراح ينفذ الدالة
                        onClick={handleIsCompleted}
                    >                        
                        <DoneIcon />
                    </IconButton>

                    {/* لكي تظهر النافذة المنبثقة true الى open عند الضغط على الزر راح يستدعي الدالة وهي تقوم بتحويل حالة ال */}
                    <IconButton onClick={handleClickOpenUpdate} className='iconButton' aria-label="delete" sx={{color: "#0d65c1", background: "white", border: "solid 2px #0d65c1"}}>
                        <EditIcon />                        
                    </IconButton>
                    {/* open = true هو النافذة المنبثقة عند الحذف وتظهر عندما تكون UpdateTask هذا المكون  */}
                    <UpdateTask open={openUpdate} handleClose={handleCloseUpdate} todo={todo}/>

                    {/* لكي تظهر النافذة المنبثقة true الى open عند الضغط على الزر راح يستدعي الدالة وهي تقوم بتحويل حالة ال */}
                    <IconButton onClick={handleClickOpenDelete}  className='iconButton' aria-label="delete" sx={{color: "#e92c2c", background: "white", border: "solid 2px #db0c0c"}}>
                        <DeleteForeverIcon/>                        
                    </IconButton>
                    {/* open = true هو النافذة المنبثقة عند الحذف وتظهر عندما تكون DeleteTask هذا المكون  */}
                    <DeleteTask open={openDelete} handleClose={handleCloseDelete} deleteElement={deleteElement}/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
}