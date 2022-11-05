import { useState } from "react"
import { ToastContainer } from 'react-toastify';
import Loading from "../components/Loading"
import { useNavigate, Link } from "react-router-dom";
import { signInUser } from "../store/authSlice"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth);

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const login = async (e) => {
        e.preventDefault();
        const postData = { username: data.username, password: data.password }
        dispatch(signInUser(postData)).then(() => {
            setTimeout(() => {
                if(localStorage.getItem('user')){
                    navigate('/')
                }
            }, 2000);
            
        })
    }

    return (<div className="">
        <ToastContainer />
        <div className="container mx-auto my-6 w-96">
            <div className="rounded bg-white p-6 cbox-shadow">
                <form onSubmit={(e) => login(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Kullanıcı adı veya E-posta adresi</label>
                        <input name="username" id="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="example@gmail | example" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Şifre</label>
                        <input name="password" id="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="******" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <button disabled={user.loading} type="submit" className="w-full justify-center text-white bg-cyan-900  disabled:bg-gray-500 focus:ring-4  font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                        {user.loading ? <Loading /> : ""}
                        Giriş Yap
                    </button>
                    <div className="flex justify-end align-center space-x-3">
                        <Link to="" className="text-sm font-medium text-red-700">Şifremi unuttum</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Login;