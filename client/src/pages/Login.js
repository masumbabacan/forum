import { useContext, useEffect, useState } from "react"
import {AuthContext} from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [err, setErr] = useState()
    const [{user},dispatch] = useContext(AuthContext);
    

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const login = (e) => {
        e.preventDefault();
        const postData = { username: data.username, password: data.password }
        fetch('http://localhost:3000/api/forum/auth/login', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(resData => {
                navigate('/')
                const addUser = {name:resData.user.name,username:data.username,role:resData.user.role}
                dispatch({type:"ADD_USER",payload:addUser})
                localStorage.setItem("user",JSON.stringify(addUser))
               
            })
            .catch(err => console.log(err))
    }

    return (<div>
        <div className="container mx-auto my-6">
            <div className="rounded bg-white p-6">
                <form onSubmit={(e) => login(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Username</label>
                        <input name="username" id="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="Username" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Password</label>
                        <input name="password" id="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="Password" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <button className="bg-cyan-500 mb-3 mt-2 py-2 text-white flex justify-center w-full rounded font-semibold">Login</button>
                    
                    <div className="flex justify-center space-x-3">
                        <a href="" className="text-sm">Forgot Password</a>
                        <a href="" className="text-sm">Reset Password</a>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Login;