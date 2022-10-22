import { useState } from "react";

const Register = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        surname: "",
        username: "",
        password: ""
    })
    const [err, setErr] = useState();

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
        .then(resData => console.log(resData))
    }

    return (<div>
        <div className="container mx-auto my-6">
            <div className="rounded bg-white p-6">
                <form onSubmit={(e) => register(e)}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="text-md font-medium">Email</label>
                        <input name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" placeholder="Email" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="text-md font-medium">Name</label>
                        <input name="name" value={data.name} onChange={(e) => handleChange(e)} type="text" placeholder="Name" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="surname" className="text-md font-medium">Surname</label>
                        <input name="surname" value={data.surname} onChange={(e) => handleChange(e)} type="text" placeholder="Surname" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="username" className="text-md font-medium">Username</label>
                        <input name="username" value={data.username} onChange={(e) => handleChange(e)} type="text" placeholder="Username" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-md font-medium">Password</label>
                        <input name="password" value={data.password} onChange={(e) => handleChange(e)} type="password" placeholder="Password" className="border outline-none border-gray-100 py-2 px-4 rounded mt-2" />
                    </div>
                    <button className="bg-cyan-500 mb-3 mt-2 py-2 text-white flex justify-center w-full rounded font-semibold">Sign Up</button>
                    <div className="flex justify-center space-x-3">
                        <a href="" className="text-sm">Forgot Password</a>
                        <a href="" className="text-sm">Reset Password</a>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Register;