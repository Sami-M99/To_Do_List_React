import { v4 as uuidv4 } from 'uuid';
/*
    يساعدنا على تقليل اللوجك الموجودة بالمكون وننقله بشكل كامل الى مكان مستقل
    معينة والأشياء المتعلقة بها State يجمع كل اللوجك المخصص لتعديل
    UI التي راح ننشأها راح تحتوي على كل الدوال المنطقية ولن تحتوي على الاوامرالمرئية المتعلقة بالـReducer يعني دالة ال

    useReducer تحمل القيمة المبدائية التي ارسلناها بال <== currentToDos
    ..ومن ثم تحمل القيمة التي اخر عملية ارجعتها هذه الدالة وهكذا [empty] والتي تعتبر بمثالنا هذا هي 
    State وبنائا عليها راح تتغير ال State تحمل الحدث الذي راح يتم تطبيقة على ال <== action
    payload و type من dispatch وفي مثالنا هذا تحمل ما تم ارساله داخل ال 
*/
export default function toDosReducer(currentToDos, action){
    switch(action.type){
        case "AddTask": {
            const newTask = {        
                id:uuidv4(),
                title: action.payload.newTitle,
                details: "",
                isCompleted: false
            };
            const tasks = [...currentToDos, newTask];
            localStorage.setItem("toDoStorage", JSON.stringify(tasks));

            // نقوم باضافة القيمة الجديدة والتعديل على المهام السابقة return وعن طريق ال 
            // setToDos(tasks) اتت بدور ال return ونلاحظ ان ال
            return tasks;
        }

        case "DeleteTask": {
            const deletedTask = currentToDos.filter((el) => {
                // المرسل من الكارت الى اللست id هنا تمت المقارنة مع ال
                return el.id !== action.payload.id;
            });
            localStorage.setItem("toDoStorage", JSON.stringify(deletedTask));

            return deletedTask;
        }
        
        case "UpdateTask": {
            const updated = currentToDos.map((el) => {
                if(el.id === action.payload.id){
                    el.title = action.payload.title;
                    el.details = action.payload.details;
                }
                return el;
            })
            localStorage.setItem("toDoStorage", JSON.stringify(updated));
            return updated;
        }

        case "IsCompletedTask": {
            const updatedTask = currentToDos.map((el) => {
                if(el.id === action.payload.id) { 
                    // state هذا الكود خطأ لاننا نسوي تعديل مباشر على المتغير والصحيح بانه يجب معاملته كال
                    // el.isCompleted = !action.payload.todo.isCompleted ;
                    const updated = {
                        ...el, isCompleted: !action.payload.isCompleted 
                    }
                    return updated;
                }
                return el;
            })
            localStorage.setItem("toDoStorage", JSON.stringify(updatedTask));

            return updatedTask;
        }

        case "GetLocalStorage": {
            const storageToDos = JSON.parse(localStorage.getItem("toDoStorage")) ?? [];
            return storageToDos;
        }

        default:{
            throw Error("Unknown Action ==> "+ action.type);
        }
    }
}