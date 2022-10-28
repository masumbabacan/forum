
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
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
    );
}

export default Footer;