import { useLocation ,Navigate} from "react-router-dom";
import {useState} from "react"
import Login from "../pages/Login";
import Register from "../pages/Register";

const PrivateRoute = (props) => {
 
    const location = useLocation();
    const [user,setUser] = useState(localStorage.getItem('user') || '')
    if(user){
        return <Navigate to="/" replace={true} />
    }

    if(location.pathname==="/login")
    {
        return <Login/>
    }
    else if(location.pathname==="/register"){
        return <Register/>
    }

}
 
export default PrivateRoute;