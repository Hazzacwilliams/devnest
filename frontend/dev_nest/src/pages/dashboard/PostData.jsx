import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recievePosts } from "../../redux/slices/recievePostsSlice";
import '../../styles/postData.css';
import LikesAndComments from "../../components/LikesAndComments";

function PostData(){

    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(recievePosts());
    }, [dispatch]);

    return (
        <div id="postDataContainer">
            {loading && <h1>Loading posts...</h1>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && posts.length > 0 && (
                <div id="postsList">
                    {posts.map((post) => (
                        <div key={post.postid} className="postItem">
                            <div id="postBannerContainer">
                                <h2>{post.posttitle} - </h2>
                                <h3>{post.userid}</h3>
                            </div>
                            <p>{post.postdata}</p>
                            <LikesAndComments postid={post.postid}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PostData;