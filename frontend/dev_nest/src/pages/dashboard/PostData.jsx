import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPosts, recievePosts } from "../../redux/slices/recievePostsSlice";
import '../../styles/postData.css';
import LikesAndComments from "../../components/LikesAndComments";
import { fetchAllLikes } from "../../redux/slices/likesSlice";
import RetrieveComments  from "../../components/RetrieveComments.jsx";
import Comments from "../../components/Comments.jsx";
import { getAllFriends } from "../../redux/slices/friendSlice.js";

function PostData({ dOrP, userid }){

    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const allFriends = useSelector((state) => state.friend.allFriends) || [];
    const [isVisible, setIsVisible] = useState({});
    

    useEffect(() => {
        dispatch(fetchAllLikes());
        dispatch(recievePosts());
        dispatch(getAllFriends());
    }, [dispatch, userid, dOrP]);

    const friendsList = allFriends
    .filter(friend => friend.status === "a") 
    .flatMap(friend => [friend.userid1, friend.userid2]) 
    .filter(id => id !== userid); 

    const filteredPosts = dOrP === "dashboard"
    ? posts.filter(post => friendsList.includes(post.userid)) 
    : posts.filter(post => post.userid === userid); 

    const toggleComments = (postid) => {
        setIsVisible((prev) => ({
            ...prev,
            [postid]: !prev[postid]
        }));
    };

    const calculateTimeElapsed = (dateCreated) => {
        const now = new Date();
        const created = new Date(dateCreated);
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
                            <div id="postBannerContainer">
                                <h2 id="postTitleUser">{post.posttitle} - {post.username}</h2>
                                
                                <p>{calculateTimeElapsed(post.date_created)}</p>
                            </div>
                            <p id="postData">{post.postdata}</p>
                            
                            {post.postmedia && (() => {
                                const mediaArray = JSON.parse(post.postmedia); // Extract the first media file
                                if(mediaArray.length !== 0){
                                    const media = mediaArray[0];
                                    if (media.match(/\.(jpeg|jpg|png|gif)$/)) {
                                        return <img src={`${process.env.REACT_APP_BACKEND_URL}/${media}`} id="postMediaImg" alt="Post media" />;
                                    } else if (media.match(/\.(mp4|mov)$/)) {
                                        return <video src={`${process.env.REACT_APP_BACKEND_URL}/${media}`} id="postMediaVid" controls />;
                                    } else {
                                        return <p>Unsupported media format</p>;
                                    }
                                }
                            })()}
                            
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