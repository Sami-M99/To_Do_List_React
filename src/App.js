import React, { useEffect } from 'react';
import ToDoList from './components/firstTodos/ToDoList';
import ToDoList2 from './components/secondeTodos/ToDoList2';
import "./App.css"
// نستخدمها لعمل ثيم وشكل جديد بالكود وهنا استخدمناها لتعميم الخط الجديد على كامل المشروع Theming
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Hooks
import { useState } from "react";
import { ToDosContext } from "./components/firstTodos/contexts/ToDosContext";

// تلقائيا بشكل معقد وغير مكرر id يستخدم لعمل 
// uuid ⇨ uuidv4() ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { v4 as uuidv4 } from 'uuid';
import { SnackBarProvider } from './components/secondeTodos/contexts/SnackBarContext';
import ToDosProvider2 from './components/secondeTodos/contexts/ToDosContext2';
// نستخدمهن للتمكن من التنقل بين الصفحات
import {Route, Routes, Link} from "react-router-dom";


// كونا متغير يحميل كل الثيمات المراد تحديدها من خط ولون لكي نرسلة على المشروع باكمله
const fontColorTheme = createTheme({
  // هنا نحط اسماء الخطوط الموجودة
  typography: {
    fontFamily: ["PtSerifFont"]
  },

  // وهنا نحدد الالوان الاساسية للمشروع وتكون تابعة لها من هنا 
  palette : {
    primary : { main : "#dd2c00"}
  }
});


// State toDos  هنا عملنا مصفوفة فيها البيانات التي راح ننقلها لل
const toDosList = [
  {
      id:uuidv4(),
      title: "Study React",
      details: "I have one week",
      isCompleted: false
  },
  {
      id:uuidv4(),
      title: "Study C#",
      details: "I have two week",
      isCompleted: true
  },
  {
      id:uuidv4(),
      title: "Study Python",
      details: "I have four week",
      isCompleted: false
  },
];


export default function App() {
  // هذه الستايت تحمل لست ببيانات لمهام مخزنة مسبقا 
  const [toDos, setToDos] = useState( toDosList );

  const [toggleValue, setToggleValue] = React.useState('Todo1');

  //ولكي تستدعى فقط عن اول تحميل للصفحة localStorage لكي تحيط بال useEffect انشأنا ال 
  useEffect(() => {
    // خاص بازرار الانتقال بين لستتي المهام localStorage وهنا انشأنا 
    // لكي عندما نعمل اعادة تحميل للصفحة يضل زر نوع اللست المحدده كما كان وما يتغيير
    // راح يتغير الزر المختار فقط بالواجهه ولكن اللست تضل كاخر وحده اخترناها وهذا خطأ كبير جدا localStorage فبدون ال
    const storageToDoListsToggle = JSON.parse(localStorage.getItem("toDoListsToggleStorage")) ?? [];
    setToggleValue(storageToDoListsToggle);
    }, []);

  return (
    // ThemeProvider ومن ثم نحيط المشرو  كاملا بالثيم الجديد بواسطة ال 
    <ThemeProvider theme={fontColorTheme} >

        {/* وسطنا كرت المهام عموديا بمنتصف الصفحة App.css بملف ال  */}
        <div className ={"App"}>
            {/* هنا عملنا ازرار التنقل بين لستتي المهام  */}
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={toggleValue}
              onChange={(event) => {
                  setToggleValue(event.target.value) 
                  localStorage.setItem("toDoListsToggleStorage", JSON.stringify(event.target.value));
                  }}
              aria-label="text alignment"
              style={{backgroundColor: "white"}}
            >
              <Link to="/">
                <ToggleButton value="Todo1" className='toggle'>First Todo List</ToggleButton>
              </Link>
              <Link to="/secondTodoList">
                <ToggleButton value="Todo2" className='toggle'>Second Todo List</ToggleButton>
              </Link>
            </ToggleButtonGroup>
          
          <Routes>
            {/* واحطناه بالمكونات التي نريد البيانات ان تصل لها يعني هذا هو الملف الأب للبيانات Provider هنا كونا المزود  
              <ToDosContext.provider value={ {toDos : toDos , setToDos : setToDos} }> الذي تحت هو اختصار لهذا الكود اذا ما غيرنا الأسماء   
              الذي فوق فراح يتعطل المشروع كاملا, يعني مكامه لازم يكون عند تاج محدده بعينها div واذا احطنا المزود بال  */}
            <Route path='/' element= {
              <ToDosContext.Provider value={{ toDos, setToDos }} >
                <ToDoList />
              </ToDosContext.Provider>
            } />

            <Route path='/secondTodoList' element= {
              // {/* ومتغيراتها محيطة بالتطبيق كامل SnackBar هنا جعلنا دالة ال */}
              <SnackBarProvider >
                {/* محيطة بالتطبيق الثاني ToDosProvider2 وجعلنا ال  */}
                <ToDosProvider2>
                  <ToDoList2 />
                </ToDosProvider2>  
              </SnackBarProvider> 
            } />
          </Routes>
        </div>
        

    </ThemeProvider>
  );
}