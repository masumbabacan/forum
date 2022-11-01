import { useContext, useState } from "react"
import {AuthContext} from "../context/AuthProvider"

const Register = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        surname: "",
        username: "",
        password: ""
    })
    const [err, setErr] = useState();

    const [{user},dispatch] = useContext(AuthContext);

    //const URL = "http://localhost:3000/api/forum";

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const register = (e) => {
        e.preventDefault();

        const postData = { email: data.email, name: data.name, surname: data.surname, username: data.username, password: data.password }
        fetch('http://localhost:3000/api/forum/auth/register', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.msg === "İşlem başarılı! Lütfen hesabınızı doğrulamak için e-postanızı kontrol edin") {
                    const addUser = {name:data.name,username:data.username,role:""}
                    dispatch({ type: "ADD_USER",payload:addUser})
                    localStorage.setItem("user",JSON.stringify(addUser))
                }
            }
            )
    }

    return (<div>
        <div className="container mx-auto my-6 w-96">
            <div className="rounded bg-white p-6">
                <form onSubmit={(e) => register(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="text-md font-medium">E-Posta</label>
                        <input name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" placeholder="example@gmail.com" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Kullanıcı Adı</label>
                        <input name="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="example" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Şifre</label>
                        <input name="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="******" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <button className="bg-cyan-500 mb-3 mt-2 py-2 text-white flex justify-center w-full rounded font-semibold">Kayıt Ol</button>
                    <div className="flex justify-end align-center space-x-3">
                        <a href="" className="text-sm font-medium text-red-700">Hesabım var</a>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Register;