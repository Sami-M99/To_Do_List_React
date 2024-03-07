import { createContext, useState, useContext } from "react";
import SnackBarMessage from "../SnackBarMessage";

//لانه لن نستخدمها برا الملف export بالطريقة العادية ولكن الغينا ال Context كونا هنا 
const SnackBarContext = createContext(
    {}
);

/* //! ====== Provider الى Context تحويل ال ======
    Context بملف واحد بنفس ملف ال Provider و Context وهو ان نسوي ال 
    بملف اخر يعتبر تطبيق غير مثالي ويكون الملفات مترابطة ببعضها وفيها بيانات غير خاصة فيها  Provider فعمل ال 
    Component نكون كل شي خاص بالملف من دوال ومزود واكواد فرعية ومن ثم نستدعيه كـ Context لذلك بملف ال
    App.js وتعني اي اكواد راح تكتب جواتها عند استدعاء المكون ونرى ذلك بملف ال children ونلاحظ اننا استخدمنا معها ال 
  */
export function SnackBarProvider({children}) {
    /* ============= Snackbar Message ============= */
    // واظهارها لمدة ثواني بسيطة true كونا الستايت من أجل تغيير حالة الرسالة الى
    const [openMessage, setOpenMessage] = useState(false);
    // <SnackbarMessage /> وهذة الستايت من أجل ارسال نص الرسالة الى 
    const [message, setMessage] = useState("");
    // وكمان لتحديد النص الذي راح يظهر بالرسالة true الدالة من أجل اظهار الرسالة بتحويل حالتها الى
    function handleSnackbarMessage(msg) {
        setOpenMessage(true);
        setMessage(msg);
        // لاخفاء الرسالة بعد ثانيتين من ظهورها
        setTimeout(() => {
            setOpenMessage(false);
        }, 2000);
    };

    return(
        <SnackBarContext.Provider value={handleSnackbarMessage}>
            {/* هذا هو مكون الرسالة التوضيحية  */}
            <SnackBarMessage open={openMessage} setOpen={setOpenMessage} message={message}/>
            {children}
        </SnackBarContext.Provider>
    );
}

//! خاص بنا وبالاسم الذي نريد Hook هنا كونا 
export const useSnackBar = () => {
	return useContext(SnackBarContext);
};

