import { useState } from "react"
import Loading from "../components/Loading"
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link} from "react-router-dom";
import { signUpUser } from "../store/authSlice"

const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const register = (e) => {
        e.preventDefault();
        const postData = { email: data.email, username: data.username, password: data.password }
        dispatch(signUpUser(postData)).then(() => {
            setTimeout(() => {
                if(localStorage.getItem('user')){
                    navigate('/')
                }
            }, 2000);
            
        })
    }

    return (<div>
        <ToastContainer />
        <div className="container mx-auto my-6 w-96">
            <div className="rounded bg-white p-6 cbox-shadow">
                <form onSubmit={(e) => register(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="text-md font-medium">E-Posta</label>
                        <input required name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" placeholder="example@gmail.com" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Kullanıcı Adı</label>
                        <input required name="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="example" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Şifre</label>
                        <input required name="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="******" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex justify-center">
                        <button disabled={user.loading} type="submit" className="w-full justify-center text-white bg-cyan-900  disabled:bg-gray-500 focus:ring-4  font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                            {user.loading ? <Loading /> : ""}
                            Kayıt Ol
                        </button>
                    </div>
                    <div className="flex justify-end align-center space-x-3">
                        <Link to="/" className="text-sm font-medium text-red-700">Hesabım var</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Register;