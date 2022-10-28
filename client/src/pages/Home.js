import PostList from "../components/PostList";
import Category from "../components/Category";
import PostPopular from "../components/PostPopuler";
import { useEffect } from "react";

const Home = () => {
   
    return (
        <section className="p-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-9 space-y-2">
                        <PostList/>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <div className="md:ml-6 mt-6 md:mt-0 space-y-6">
                            <Category/>
                            <PostPopular/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;