//Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { receivePosts } from "../../redux/slices/recievePostsSlice";
import '../../styles/postData.css';
import LikesAndComments from "../../components/LikesAndComments";
import { fetchAllLikes } from "../../redux/slices/likesSlice";
import RetrieveComments from "../../components/RetrieveComments.jsx";
import Comments from "../../components/Comments.jsx";
import { getAllFriends } from "../../redux/slices/friendSlice.js";
import { PacmanLoader, HashLoader } from "react-spinners";

function PostData({ dOrP, userid }) {

    //Initializing Component
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const allFriends = useSelector((state) => state.friend.allFriends) || [];
    const [isVisible, setIsVisible] = useState({});
    const [mediaLoaded, setMediaLoaded] = useState({});
    const navigate = useNavigate();

    //Recieves post related data from state
    useEffect(() => {
        dispatch(fetchAllLikes());
        dispatch(receivePosts());
        dispatch(getAllFriends());
    }, [dispatch, userid, dOrP]);

    //Media function for spinner if long load time
    const handleMediaLoad = (postid) => {
        setMediaLoaded((prev) => ({ ...prev, [postid]: true }));
    };

    //Saves user list of friends
    const friendsList = allFriends
        .filter(friend => friend.status === "a")
        .flatMap(friend => [friend.userid1, friend.userid2])

    //Filters all posts based on friendslist
    const filteredPosts = dOrP === "dashboard"
        ? posts.filter(post => friendsList.includes(post.userid))
        : posts.filter(post => post.userid === userid);

    //Sorts posts by date
    const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );

    //Comment toggle
    const toggleComments = (postid) => {
        setIsVisible((prev) => ({
            ...prev,
            [postid]: !prev[postid]
        }));
    };

    //Calculates time since post was created
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

    const handleNameClick = (userid) => {
        navigate(`/profile/${userid}`);
    }

    return (
        <div id="postDataContainer">
            {loading && <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                <PacmanLoader color="#4f46e5" size={35} />
            </div>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && (
                <div id="postsList">
                    {sortedPosts.length === 0 ? <h3>{dOrP === "dashboard"
                        ? "Add friends to view content"
                        : "No posts yet. Create your first post!"}
                    </h3> :
                        sortedPosts.map((post) => (
                            <div key={post.postid} className="postItem">
                                <div id="postBannerContainer">
                                    <h2 id="postTitleUser" onClick={() => handleNameClick(post.userid)}>{post.posttitle} - {post.username}</h2>

                                    <p>{calculateTimeElapsed(post.date_created)}</p>
                                </div>
                                <p id="postData">{post.postdata}</p>

                                {post.postmedia && (() => {
                                    const mediaArray = JSON.parse(post.postmedia);
                                    if (mediaArray.length !== 0) {
                                        const media = mediaArray[0];
                                        const isImage = media.match(/\.(jpeg|jpg|png|gif)$/);
                                        const isVideo = media.match(/\.(mp4|mov)$/);

                                        return (
                                            <div style={{ position: "relative", textAlign: "center" }}>
                                                {!mediaLoaded[post.postid] && <HashLoader color="#4f46e5" size={35} />}

                                                {isImage && (
                                                    <img
                                                        src={media}
                                                        id="postMediaImg"
                                                        alt="Post media"
                                                        style={{ display: mediaLoaded[post.postid] ? "block" : "none" }}
                                                        onLoad={() => handleMediaLoad(post.postid)}
                                                    />
                                                )}

                                                {isVideo && (
                                                    <video
                                                        src={media}
                                                        id="postMediaVid"
                                                        controls
                                                        style={{ display: mediaLoaded[post.postid] ? "block" : "none" }}
                                                        onLoadedData={() => handleMediaLoad(post.postid)}
                                                    />
                                                )}
                                            </div>
                                        );
                                    }
                                })()}


                                <LikesAndComments postid={post.postid} toggleComments={toggleComments} />
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