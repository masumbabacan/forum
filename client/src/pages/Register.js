import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
<<<<<<< Updated upstream
import Loading from "../components/Loading"
import { ToastContainer } from 'react-toastify';
import axios from "axios"
import ToastMessage from "../utils/ToastMessage"
=======
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes

const Register = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        surname: "",
        username: "",
        password: ""
    })
<<<<<<< Updated upstream

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [msg, setMsg] = useState("");
=======
    const navigate = useNavigate()
    const [err, setErr] = useState();

    const [{ user }, dispatch] = useContext(AuthContext);
>>>>>>> Stashed changes

    const [{ user }, dispatch] = useContext(AuthContext);

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const register = (e) => {
        e.preventDefault();
        setLoading(true)
        const postData = { email: data.email, username: data.username, password: data.password }

        axios.post('http://localhost:3000/api/forum/auth/register',postData)
        .then((response) =>{
            ToastMessage(response.data.msg, true);
            setLoading(false)
        })
        .catch((err)=>{
            ToastMessage(err.response.data.msg, false);
            setLoading(false)
        })
<<<<<<< Updated upstream
=======
            .then(res => res.json())
            .then(resData => {
                if (resData.msg === "İşlem başarılı! Lütfen hesabınızı doğrulamak için e-postanızı kontrol edin") {
                    const addUser = { name: data.name, username: data.username, role: "" }
                    dispatch({ type: "ADD_USER", payload: addUser })
                    localStorage.setItem("user", JSON.stringify(addUser))
                    navigate('/')
                }
            }
            )
>>>>>>> Stashed changes
    }


    return (<div>
        <ToastContainer />
        <div className="container mx-auto my-6 w-96">
            <div className="rounded bg-white p-6">
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
                    {/* <button className="bg-cyan-500 mb-3 mt-2 py-2 text-white flex justify-center w-full rounded font-semibold">
                      Kayıt Ol
                    </button> */}
                    <div className="flex justify-center">
                        <button disabled={loading}  type="submit" className="w-full justify-center text-white bg-cyan-900  disabled:bg-gray-500 focus:ring-4  font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                            {
                                loading ? <Loading /> : ""
                            }
                            Kayıt Ol
                        </button>
                    </div>
                    <div className="flex justify-end align-center space-x-3">
                        <a href="" className="text-sm font-medium text-red-700">Hesabım var</a>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Register;