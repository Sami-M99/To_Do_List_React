import { createContext } from "react";

// createContext هنا انشأنا البيانات وجعلناها عامة بواسطة 
// بالملف الأب  Provider عند تكوين المزود value هنا تركنا المصفوفة فارغة لاننا راح نعرف بيانات ثابتة ولازم علينا تحديد البيانات في ال 
export let ToDosContext = createContext(
    []
);
