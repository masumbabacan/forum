import { createContext, useEffect, useReducer, useState } from "react"
import reducer from "./reducer"

export const AuthContext = createContext();

const initialState = {
    user: {
        name: "",
        username: "",
        role:""
    }
}

const AuthProvider = ({ children }) => {
    const [data,setData] = useState({});
    const localData = localStorage.getItem('user');
    useEffect(()=>{
        if(localData){
            setData(JSON.parse(localData))
        }else{
            setData(initialState)
        }
    },[])

    const [state, dispatch] = useReducer(reducer, data)

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;