import React, { useState } from "react";
import '../../styles/posts.css';
import NewPostPop from "./NewPostPop";

function Posts(){

    const [showCreatePost, setShowCreatePost] = useState(false);


    const newPostClick = (e) => {
        e.preventDefault();
        if(showCreatePost === false){
            setShowCreatePost(true);
        } else {
            setShowCreatePost(false);
        }

    }

    return (
        <div id="posts">
            <div id="newPostBtnContainer">
                <button onClick={newPostClick} id="newPostBtn">NEW POST</button>
            </div>
            <div id="postPopUpContainer">
                {showCreatePost ? (<NewPostPop id="inFront" />) : (<h1>FETCHING POSTS...</h1>)}
            </div>
            
            
        </div>
    )
};

export default Posts;