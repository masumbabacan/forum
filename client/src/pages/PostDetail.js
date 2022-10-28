import { useParams } from 'react-router-dom';

const PostDetail = () => {
    let { id } = useParams();

    return (
        <div className="container mx-auto my-6">
            <div className="rounded bg-white p-6">
                Post Detail {id}
            </div>
        </div>
    );
}

export default PostDetail;