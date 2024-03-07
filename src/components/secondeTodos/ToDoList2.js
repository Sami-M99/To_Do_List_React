import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from "react";
import ToDoCard2 from './ToDoCard2';

/* //! ========== useMemo ==========
لتحفظ القيمة الأخيرة الناتجة للمتغير Caching (Memorizing) يعمل لنا 
component مباشرة وليست داخل دوال داخل ال component فعندما تكون عندنا متغيرات داخل ال
للصفحة وهذا يهلك البرنامج ويضعف من أدائه re-render فراح تشتغل هذه الأكواد مع كل 
لحفظ اخر قيمة ناتجة من المتغير بعد أول تحميل  useMemo لذلك نستخدم ال
ياخذ اخر قيمة محفوظة دون الحاجة لتكرار تنفيذ الكود re-render ويكون عند عمل ال 
*/
import { useMemo } from 'react';
import DeleteTask2 from './DeleteTask2';
import UpdateTask2 from './UpdateTask2';
import { useSnackBar } from './contexts/SnackBarContext';
import { ToDosContext2 } from './contexts/ToDosContext2';


export default function ToDoList2() {

    /* //! ========= useReducer Hook =========
    هنا dispatch مع هذا الملف للتمكن من استخدام ال reducers التي انشاناها بمجلد ال toDosReducer هنا قمنا بربط دالةال
    State هو المتغير الذي راح يحمل ال <== toDos
    بطرية غير مباشرة  State وهو وسيط لارسال امر معين, وكذلك لتعديل ال <== dispatch
    وتنفذها وترجع ما فيها reducer فهي تقوم بالذهاب الى دالة ال
    useReducer( القيمة المبدائية , نكتب هنا الدالة التي تحمل المنطق البرمجي وتحمل 2 من المعاملات ); 
    */
    /* const [toDosR, dispatch] = useReducer(toDosReducer, []); */
    /* //? Context انشأناه مرة واحده وجعلناه كـ useReducer هنا بدل ما كنا ننشئ بكل مرة  */
    const {toDosR ,dispatch}= useContext(ToDosContext2);

    const [taskTitle, setTaskTitle] = useState("");
    const [filteredToDos, setFilteredToDos] = useState("all");

    //وسيط فيها useMemo مكتوبة مباشرة للمتغير استخدمنا ال filter هنا بدل ما كانت ال
    const completedToDos = useMemo(() => {
        // undefined فراح يرجع لنا قيمة return اذا ما كتبنا 
        return toDosR.filter(
        (item) => {
            //سواء كان خاص بالمهام وفلترتها او لا re-render بالأكواد بالملف السابق كانت هذه تشتغل بكل 
            // وهذا يعتبر خطأ كبير لانه يزيد من مهام البرنامج وتشتغل هذه الفلتره واكوادها عند عدم الحاجة اليها ايضا
            console.log("completed ToDos");
            return item.isCompleted;
        });
        // useMemo الذي اذا تاثرت او عدل عليها يشتغل ما داخل ال State وأخيرا نحدد داخل الاقواس المتغير او ال 
    }, [toDosR])

    const notCompletedToDos = useMemo(() => {
        return toDosR.filter((item) => !item.isCompleted);
    }, [toDosR])
    

    let toDosAfterFiltering = toDosR;

    if(filteredToDos === "completed"){
        toDosAfterFiltering = completedToDos;
    }
    else if(filteredToDos === "notCompleted") {
        toDosAfterFiltering = notCompletedToDos;
    }
    else {
        toDosAfterFiltering = toDosR;
    }

    /* ============= Snackbar Message ============= */
    // جاهزا SnackBarContext الذي انشأناه من ملف ال Hook اخذنا هذا ال 
    const message = useSnackBar();

    /* ============= Delete Task =============
    بدل ما كانت النوافذ المنبثقة تعرف داخل كروت المهام هنا عرفناها داخل لست المهام بالكامل
    والفائدة هي اننا عرفناها لمرة واحدة فقط لكل المهام ويتم استدعائها عند الضغط على زر الحذف
    بل ما كان يتم تعريفها وانشائها مع كل مهمه موجودة وهذا امر خاطى جدا 
    للحذف والتعديل Dialog بالمتصفح نرى انه تحت كل كرت توجد نافذتان  component ويمكننا ملاحظة ذلك من قسم ال 
    من ملف الكارت الى هنا <DeleteTask2 /> فأفضل حل أمامنا هو اخراج 
    */

    const [openDelete, setOpenDelete] = useState(false);
    // انشاناها لكي تحفظ لنا ما هي المهمة المحدد عليها بالحذف
    const [currentDeletedTodo, setCurrentDeletedTodo] = useState();
    //! وتبادل العناصر بيناهما ToDoList2 بال ToDoCard2 هذه اهم خطوة وهي ربط ال
    // ولان هذه الدالة هي مفتاح الربط بين اللست والكارت فارسلنا من خلالها المهمة الحالية المحدد عليها بالحذف من الكارت للست
    function handleClickOpenDelete(currentTodo) {
        setOpenDelete(true);
        setCurrentDeletedTodo(currentTodo);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        // setToDos(toDos);
    };
    function deleteElement() {
        /* Reducer تمت نقل هذه الاكواد المنطقية الى دالة ال
            const deletedTask = toDos.filter((el) => {
                المرسل من الكارت الى اللست id هنا تمت المقارنة مع ال
                return el.id !== currentDeletedTodo.id;
            });
            setToDos(deletedTask);

            localStorage.setItem("toDoStorage", JSON.stringify(deletedTask));
        */
        // dispatch({type: "DeleteTask", payload: {id: currentDeletedTodo.id}})
        dispatch({type: "DeleteTask", payload: currentDeletedTodo })
        // وهذه لكي يغلق النافذة المنبثقة بعد الحذف
        setOpenDelete(false);
        // لاضهار رسالة ان مهمة الحذف تمت بنجاح
        message("Task Deleted");
    }


    /* ============= Update Task ============= */
    const [openUpdate, setOpenUpdate] = useState(false);
    // انشاناها لكي تحفظ لنا ما هي المهمة المحدده للتعديل ولكي تكون حاملة البيانات بمربعات الادخال قبل التعديل عيها
    // فاذا عدلنا البيانات بمربعات الادخال والغينا التعديل فما راح تتاثر لانها راح تنقل مرة أخرى بالبيانات الاصلية للكرت من هنا
    const [currentUpdatedTodo, setCurrentUpdatedTodo] = useState();
    function handleClickOpenUpdate(currentTodo) {
        setOpenUpdate(true);
        setCurrentUpdatedTodo(currentTodo);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };


    /* ============= Add Task ============= */
    function handleAddTask(){
        // المراد action عن طريق نوع ال Reducer هنا استدعينا المهام اللازمة من ال 
        dispatch({ type:"AddTask", payload: { newTitle: taskTitle } });
        // تركنا هاتان المهمتان فقط لانهن مهام مرئية لها علاقة بالواجهة وليست مهام منطقية 
        setTaskTitle("");
        // هنا من أجل اضهار رسالة بزاوية الشاشة من تحت ان الاضافة تمت
        message("Task Added");
    }


    const toDosJSX = toDosAfterFiltering.map(
        (item) => {
            // ارسلنا امر فتح نافذة الحذف من هنا
            return <ToDoCard2 
                        key={item.id} 
                        todo={item} 
                        openDeleteDialog ={handleClickOpenDelete} 
                        openUpdateDialog={handleClickOpenUpdate} 
                        message={message}
                    />
        }
    );

    useEffect(() => {
        dispatch({ type: "GetLocalStorage" })
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Card variant="outlined" style={{maxHeight: "80vh", overflow:"auto"}}>
                    <CardContent>
                        <Typography variant="h3" component="div" fontWeight= {"bold"}>
                        To Do List 2
                        </Typography>
                        <Divider />
                        <ToggleButtonGroup
                            style={{margin: "20px"}}
                            value={filteredToDos}
                            exclusive
                            onChange={(event) => setFilteredToDos(event.target.value) }
                            aria-label="text alignment"
                            color='primary'
                        >
                            <ToggleButton value="all" > All </ToggleButton>
                            <ToggleButton value="notCompleted" > In Progress </ToggleButton>
                            <ToggleButton value="completed" > Done </ToggleButton>
                        </ToggleButtonGroup>

                        {/* === Todo Cards Component === */}
                        { toDosJSX }

                        {/* === Input & Add Button === */}
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField 
                                    value = {taskTitle}
                                    onChange = {(event) => { setTaskTitle(event.target.value); }}
                                    id="outlined-basic" 
                                    label="Task Title" 
                                    variant="outlined" 
                                    style={{width: "100%"}}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Button 
                                    onClick= { handleAddTask }
                                    variant="contained" 
                                    style={{width: "100%", 
                                    height: "100%", 
                                    textTransform: "capitalize", 
                                    fontSize: "18px", 
                                    }}
                                    disabled = {taskTitle.trim() === ""}
                                    >Add Task</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Container>

            {/* ونلاحظ اننا استدعينا وكونا مكونات الحذف والتعديل هنا بدل ما كانت بالكارت */}
            <DeleteTask2 open={openDelete} handleClose={handleCloseDelete} deleteElement={deleteElement}/>
            <UpdateTask2 open={openUpdate} handleClose={handleCloseUpdate} todo={currentUpdatedTodo} setTodo={setCurrentUpdatedTodo} message={message}/>
        </>
    );
}