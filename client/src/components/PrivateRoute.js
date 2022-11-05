import { useLocation ,Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({user}) => {

    if(user){
        return <Navigate to="/" replace={true} />
    }
    return <Outlet/>

}
 
export default PrivateRoute;