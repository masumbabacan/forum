import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const USER_URL = "http://localhost:3000/api/forum/auth/login";

const LoginUser = postData => {
    console.log(postData);

    const navigate = useNavigate()
    const [dispatch] = useContext(AuthContext);

    fetch('http://localhost:3000/api/forum/auth/login', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(resData => {
            console.log("testsdadsada")
            // navigate('/')
            // const addUser = { name: resData.user.name, username: postData.username, role: resData.user.role }
            // dispatch({ type: "ADD_USER", payload: addUser })
            // localStorage.setItem("user", JSON.stringify(addUser))

        })
        .catch(err => console.log(err))
}

export default LoginUser