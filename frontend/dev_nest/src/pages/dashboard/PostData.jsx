import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPosts, recievePosts } from "../../redux/slices/recievePostsSlice";
import '../../styles/postData.css';
import LikesAndComments from "../../components/LikesAndComments";
import { fetchAllLikes } from "../../redux/slices/likesSlice";
import RetrieveComments  from "../../components/RetrieveComments.jsx";
import Comments from "../../components/Comments.jsx";

function PostData({ dOrP, userid }){

    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const user = useSelector((state) => state.login.user)
    const [isVisible, setIsVisible] = useState({});
    

    useEffect(() => {
        dispatch(fetchAllLikes());
        dispatch(recievePosts());
    }, [dispatch, userid, dOrP]);

    const filteredPosts = dOrP === "dashboard" ? posts : posts.filter((post) => post.userid === userid);

    const toggleComments = (postid) => {
        setIsVisible((prev) => ({
            ...prev,
            [postid]: !prev[postid]
        }));
    };

    const calculateTimeElapsed = (dateCreated) => {
        console.log(dateCreated);
        const now = new Date();
        const created = new Date(dateCreated);
        console.log(`created: ${created}`);
        const diffInSeconds = Math.floor((now - created) / 1000);
    
        const days = Math.floor(diffInSeconds / (24 * 60 * 60));
        const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    
        if (days > 0) return `${days}d ${hours}h ago`;
        if (hours > 0) return `${hours}h ${minutes}m ago`;
        return `${minutes}m ago`;
    }; 

    return (
        <div id="postDataContainer">
            {loading && <h1>Loading posts...</h1>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && posts.length > 0 && (
                <div id="postsList">
                    {filteredPosts.length === 0 ? <h3>No Posts for user yet!</h3> :
                    filteredPosts.map((post) => (
                        <div key={post.postid} className="postItem">
                            {console.log(posts)}
                            <div id="postBannerContainer">
                                <h2>{post.posttitle} - {post.username}</h2>
                                <p>{calculateTimeElapsed(post.date_created)}</p>
                            </div>
                            <p id="postData">{post.postdata}</p>
                            <LikesAndComments postid={post.postid} toggleComments={toggleComments}/>
                            {isVisible[post.postid] && (
                                <>
                                    <RetrieveComments postid={post.postid} />
                                    <Comments postid={post.postid} />
                                </>
                            )}
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
    )
}

export default PostData;