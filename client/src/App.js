import { Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Pages404 from "./pages/Pages404"
import PrivateRoute from "./components/PrivateRoute"
import PostDetail from "./pages/PostDetail"
import { useSelector } from "react-redux";


function App() {
  const { user,test} = useSelector(state => state.auth);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route element={<PrivateRoute user={user} />} >
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Pages404 />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
