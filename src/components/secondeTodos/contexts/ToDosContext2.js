import { createContext, useReducer } from "react";
import toDosReducer from "../reducers/toDosReducer";

//! Context محاط للمشروع بأكمله وجعله كـ Reducer هنا نريد جعل ال 
export const ToDosContext2 = createContext(
    []
);

export default function ToDosProvider2({children}){
    // بكل ملف نريد استخدامها فيها useReducer هنا بدل ما ننشئ 
    // يحيط بالتطبيق الثاني بأكمله Context كـ useReducer نعمل ال
    const [toDosR, dispatch] = useReducer(toDosReducer, []);

    return(
        <ToDosContext2.Provider value={{toDosR : toDosR, dispatch: dispatch}}>
            {children}
        </ToDosContext2.Provider>
    );
}


