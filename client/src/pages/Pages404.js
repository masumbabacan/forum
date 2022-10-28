import {Link} from "react-router-dom"

const Pages404 = () => {
    return (
        <div className="container mx-auto my-6">
            <div className="rounded bg-white text-center p-16">
                <h1 className="font-bold text-8xl text-center text-cyan-900 mb-4">404</h1>
                <Link to="/" className="text-gray-600 font-semibold">Go to homepage</Link>
            </div>
        </div>
    );
}

export default Pages404;