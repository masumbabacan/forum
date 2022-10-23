import { BiSearch } from "react-icons/bi";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import {Route,Routes,NavLink} from "react-router-dom"
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login"
import Register from "./components/Register"
import ResetPassword from "./components/ResetPassword";

function App() {
  
  return (
    <div className="bg-gray-100">
      <section className="bg-white border-b border-gray-200 p-6 ">
        <div className="container flex justify-between mx-auto">
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
            <NavLink to="login" className="py-3 px-5 text-sm box-border w-20 h-10 border-2 border-cyan-900 bg-white text-cyan-900 font-semibold	 rounded">Login</NavLink>
            <NavLink to="register"  className="py-3 px-5 text-sm box-border w-20 h-10 bg-cyan-900 text-white  font-semibold  rounded">Sign Up</NavLink>
          </div>
        </div>
      </section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <section className="p-6 bg-white border-gray-200  border-t">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <img src="" alt="" />
              <h6 className="font-semibold">Forum Project | 2022</h6>
            </div>
            <div className="flex space-x-3">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </section>
    </div>

  )

}

export default App;
