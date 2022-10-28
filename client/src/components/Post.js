import { AiFillEye, AiOutlineComment } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Post = () => {
    return (
    <div className="flex md:flex-row flex-col md:items-center p-6 bg-white rounded">
        <div className="flex items-center flex-1">
            <img src="img/user.jpg" className="rounded-full w-12" alt="" />
            <div className="pl-6 pr-6 flex-1">
                <NavLink to="/post/1" className="text-lg font-medium">Lorem ipsum dolor sit amet</NavLink>
                <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
            </div>
        </div>
        <div className="flex space-x-3 items-center  justify-end mt-4 md:mt-0">
            <span className="flex items-center text-sm"><AiFillEye color="black" /> 208</span>
            <span className="h-2 w-2 bg-purple-200	 rounded-full inline-block"></span>
            <span className="flex items-center text-sm"><AiOutlineComment /> 6.040</span>
        </div>
    </div>
    );
}

export default Post;