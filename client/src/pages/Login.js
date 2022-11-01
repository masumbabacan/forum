import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ToastMessage from "../utils/ToastMessage"
import axios from "axios"
import Loading from "../components/Loading"

const Login = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [err, setErr] = useState()
    const [{ user }, dispatch] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const login = (e) => {
        e.preventDefault();
        const postData = { username: data.username, password: data.password }
        setLoading(true)

        axios.post('http://localhost:3000/api/forum/auth/login', postData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                ToastMessage(response.data.msg, true);
                setLoading(false)
                navigate('/')
                const addUser = {name:response.user.name,username:data.username,role:response.user.role}
                dispatch({type:"ADD_USER",payload:addUser})
            })
            .catch((err) => {
                ToastMessage(err.response.data.msg, false);
                setLoading(false)
            })

        // fetch('http://localhost:3000/api/forum/auth/login', {
        //     method: 'POST',
        //     body: JSON.stringify(postData),
        //     headers: { 'Content-Type': 'application/json' },
        // })
        //     .then(res => res.json())
        //     .then(resData => {
        //         navigate('/')
        //         const addUser = {name:resData.user.name,username:data.username,role:resData.user.role}
        //         dispatch({type:"ADD_USER",payload:addUser})
        //         localStorage.setItem("user",JSON.stringify(addUser))

        //     })
        //     .catch(err => console.log(err))
    }

    return (<div>
        <ToastContainer />
        <div className="container mx-auto my-6 w-96">
            <div className="rounded bg-white p-6">
                <form onSubmit={(e) => login(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Kullanıcı adı veya E-posta adresi</label>
                        <input name="username" id="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="example@gmail | example" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Şifre</label>
                        <input name="password" id="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="******" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <button disabled={loading} type="submit" className="w-full justify-center text-white bg-cyan-900  disabled:bg-gray-500 focus:ring-4  font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                        {
                            loading ? <Loading /> : ""
                        }
                        Giriş Yap

                    </button>

                    <div className="flex justify-end align-center space-x-3">
                        <a href="" className="text-sm font-medium text-red-700">Şifremi unuttum</a>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Login;