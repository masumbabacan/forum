const Category = () => {
    return (
    <div className="bg-white p-6 rounded">
        <h3 className="border-b border-purple-100 pb-3 font-semibold">Categories</h3>
        <div className="space-y-1 mt-3">
            <a href="" className="flex justify-between items-center">
                <span>Gaming</span>
                <span className="bg-purple-100 p-1 rounded text-black text-center">12</span>
            </a>
            <a href="" className="flex justify-between items-center">
                <span>Sport</span>
                <span className="bg-purple-100 p-1 rounded text-black text-center">20</span>
            </a>
            <a href="" className="flex justify-between items-center">
                <span>News</span>
                <span className="bg-purple-100 p-1 rounded text-black text-center">1</span>
            </a>
            <a href="" className="flex justify-between items-center">
                <span>Travel</span>
                <span className="bg-purple-100 p-1 rounded text-black text-center">3</span>
            </a>
            <a href="" className="flex justify-between items-center">
                <span>Movies</span>
                <span className="bg-purple-100 p-1	rounded text-black text-center">26</span>
            </a>
        </div>
    </div>
    );
}

export default Category;