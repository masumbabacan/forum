import { useEffect, useState } from "react";
import Post from "../components/Post";
import SkeletonPost from "../components/SkeletonPost"

const PostList = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])

    return (<>
        {
            loading ? 
            <SkeletonPost /> : <>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </>
        }



    </>);
}

export default PostList;