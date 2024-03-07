import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// Material UI
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

// Hooks & Components
import { useState, useContext, useEffect } from "react";
import { ToDosContext } from './contexts/ToDosContext';
import ToDoCard from './ToDoCard';


export default function ToDoList() {
    // Context هنا اولا استدعينا البيانات العامة بهذا الشكل لانها
    // ومن ثم قمنا بعمل تدمير وقسمنا البيانات حسب ما ارسلت 
    const {toDos, setToDos} = useContext(ToDosContext);

    // هذه الستايت لمربع الادخال تضيف عنوان لمهمة جديدة
    const [taskTitle, setTaskTitle] = useState("");

    // لتحديد الزر الذي اخترناه ببار فلترة المهام State كونا 
    const [filteredToDos, setFilteredToDos] = useState("all");

    // هنا عملنا فلتره للمهام المكتملة 
    const completedToDos = toDos.filter((item) => item.isCompleted);
    
    // هنا عملنا فلتره للمهام الغير مكتملة 
    const notCompletedToDos = toDos.filter((item) => !item.isCompleted);

    let toDosAfterFiltering = toDos;
    
    // كونا شرط لكي يحمل البيانات بعد فلترتها وينقلها للمتغر اذا اخترنا الفلترة
    // للبيانات منه map الذي راح نعمل toDosAfterFiltering وينقلها للمتغير toDos او ياخذها كامله من ال
    if(filteredToDos === "completed"){
        toDosAfterFiltering = completedToDos;
    }
    else if(filteredToDos === "notCompleted") {
        toDosAfterFiltering = notCompletedToDos;
    }
    else {
        toDosAfterFiltering = toDos;
    }

    // الى المكون كارت لكي يعرضها واحده تلو الاخرى toDos وليس من toDosAfterFiltering لارسال البيانات المخزنة ب map وهنا عملنا 
    // لاننا نريد اخذ البيانات المعطاه بعد اختيار الفلترة toDos وليس ل toDosAfterFiltering ل map نلاحظ اننا عملنا 
    const toDosJSX = toDosAfterFiltering.map(
        (item) => {
            return <ToDoCard key={item.id} todo={item} />
        }
    );

    function handleAddTask(){
        //ومن ثم اضفنا البيانات المدخلة ...toDos نلاحظ هنا اننا اولا اخذنا البيانات الموجودة مسبقا ب
        // State ونلاحظ ايضا ان البيانات باكملها عباره عن مصفوفة لانها عرفت كمصفوفة داخل ال 
        const newTask = {        
            id:uuidv4(),
            title: taskTitle,
            details: "",
            isCompleted: false};
        const tasks = [...toDos, newTask];
        setToDos(tasks);
        // وهذه لمسح الكلام من مربع الادخال بعد الاضافة
        setTaskTitle("");

        // لكي لا تنحذف عن عمل اي تحديث للصفحة أو حتى عند اغلاقها  local Storage هنا عملنا كتابة للمهام المضافة بال 
        localStorage.setItem("toDoStorage", JSON.stringify(tasks));
    }

    /* //! ========= useEffect Hook =========
        Side Effect يعني تعمل  component عبارة عن دالة تستاعدنا على استدعاء أشياء خارج ال useEffect
        تبع المكون بأكملة load وتستدعى عندما يكتمل ال 
        localStorage هو حفظ البيانات بال useEffect الهدف الأساسي هنا من استخدام ال 
    */
    useEffect(() => {
        /*  localStorage باي اسم ونستخدمة عند الكتابة بال "key" ونكتب فيها ال localStorage هنا قرائنا البيانات من 
            setToDos لكي نستخدمها بال  JSON فلازم نحولها الى بيانات string عبارة عن "key" ولان ال 
            .filter فاضية وما يمكننا عمل فلتره localStorage لكي تجنبنا خطأ يحدث عندما تكون ال ?? []
        */
        const storageToDos = JSON.parse(localStorage.getItem("toDoStorage")) ?? [];
        setToDos(storageToDos);

        /* عند التعامل معها useEffect الثاني يكون كمصفوفة وفيه المتغيرات او الستايت الذي نريد عمل  parameter وال
            re-render فقط عند اول تحميل ولا تستدعى عند كل  useEffect واذا تركنا المصفوفة فارغة فراح تستدعى 
            لكل شي re-render واذا حذفنا المصفوفة الفارغة فراح يعمل 
        */
    }, []);

    return (
        // لكي نجل التصميم بمنتصف الصفحة من افقيا Container نسوي 
        <Container maxWidth="sm">
        {/* لأنها انسب شي لعمل كرت المهام Card اخترنا ال  */}
            <Card variant="outlined" style={{maxHeight: "80vh", overflow:"auto"}}>
                <CardContent>
                    {/* اذا ما عدلنا عليها p تاتي مع الكارت وتمثل كأنها  Typography */}
                    {/* <Tag /> لتحديد اي راح يصير نوع ال component فتحدد بالحجم بالذي نحن نريد وال variant ولكن هنا لاستخدامنا ال  */}
                    <Typography variant="h3" component="div" fontWeight= {"bold"}>
                    To Do List 1
                    </Typography>
                    {/* لعمل خط افقي فاصل Divider */}
                    <Divider />
                    {/* لعمل الثلاثةالازرار مع بعض مرة واحدة Toggle Button استخدمنا ال  */}
                    <ToggleButtonGroup
                        style={{margin: "20px"}}
                        // ToggleButton تبع ال value هذه تحمل القيمة التي راح تنعكس على ال
                        value={filteredToDos}
                        // من اجل يتحدد زر واحد فقط exclusive
                        exclusive
                        // الى قيمة الزر وبذلك ينم تحديده filteredToDos فراح يغير من قيمة ال Toggle وهنا عند الضغط على أي رز بال 
                        onChange={(event) => setFilteredToDos(event.target.value) }
                        aria-label="text alignment"
                        // App.js هنا اخذنا اللون من اللون المحدد بالثيم الذي كوناه نحن بملف
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
                                //بعملية ادخال عنوان المهمة State الذي فوق ضبطنا ال 
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
                                //لعمل شرط من اجل ما يضيف مهمة فارغة ويلغي عمل الزر disabled استخدمنا 
                                // من اجل يحدف المسافات الفارغة ببداية الكلام ونهايته ووسط الكلام مسافة فقط يترك .trim()
                                disabled = {taskTitle.trim() === ""}
                                >Add Task</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Container>
    );
}