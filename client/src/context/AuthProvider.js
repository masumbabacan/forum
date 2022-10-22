import { createContext, useReducer} from "react"
import reducer from "./reducer"

export const AuthContext = createContext();

const initialState={
    // user:{userId:'',id: '',title:'',completed:''},
}

const AuthProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        <AuthContext.Provider value={[state,dispatch]}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;