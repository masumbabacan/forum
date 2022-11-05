import { NavLink } from "react-router-dom"
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react"
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../store/authSlice"
import axios from "axios";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const localData = localStorage.getItem('user');
    const parse = localData ? JSON.parse(localData) : ''
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/forum/users/showMe")
            .then(res => console.log(res))
            .catch(err=>console.log(err))
    }, [])
    const modal = () => {
        setOpenModal(!openModal)
    }
    const logout = () => {
        dispatch(removeUser());
        setOpenModal(false)
    }

    return (<section className="bg-white border-b border-gray-200 p-6 ">
        <div className="container relative flex justify-between items-center mx-auto">
            <div className="flex items-center">
                <NavLink to="/" className="text-xl md:text-2xl font-bold">Forum Project</NavLink>
            </div>
            <div className="lg:flex hidden ">
                <input type="text" className="bg-gray-100  w-80 pl-2 border-t border-l border-b rounded-tl rounded-bl outline-0" placeholder="Search" />
                <div className="flex justify-center items-center bg-cyan-900	rounded py-2 px-4">
                    <BiSearch size={20} color="white" />
                </div>
            </div>
            <div className="space-x-1 md:space-x-3 box-border ">
                {
                    !localData ? <> <NavLink to="login" className="py-3 px-5 text-sm box-border w-20 h-10 border-2 border-cyan-900 bg-white text-cyan-900 font-semibold rounded">Login</NavLink>
                        <NavLink to="register" className="py-3 px-5 text-sm box-border w-20 h-10 border-2 border-cyan-900 bg-cyan-900 text-white  font-semibold  rounded">Sign Up</NavLink></> : <div className="flex items-center text-gray-500"><BsPersonCircle color="#6b7280" size={25} />{openModal ? <div className="bg-gray-50 absolute border border-gray-300 right-0 top-12 py-3 px-4 rounded w-40 flex flex-col" ><div className="flex justify-end rounded" onClick={() => modal()}><span className="absolute -top-3 -right-3 w-6 h-6 text-center text-white rounded-full bg-purple-200 cursor-pointer" >x</span></div><button>Kullanıcı Bilgileri</button><button onClick={() => logout()}>Çıkış Yap</button></div> : ""} <span className="font-medium ml-2 cursor-pointer" onClick={() => modal()} >{parse.username}</span> </div>
                }
            </div>
        </div>
    </section>);
}

export default Header;