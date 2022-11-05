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

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Pages404 />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
