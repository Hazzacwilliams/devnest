//Imports
import React, { useState } from "react";
import '../../styles/postsCreation.css';
import NewPostPop from "./NewPostPop.jsx";

function PostsCreation() {
  
    const [showCreatePost, setShowCreatePost] = useState(false);

    const newPostClick = (e) => {
        e.preventDefault();
        setShowCreatePost(true);
    };

    const closePopUp = (e) => {
        setShowCreatePost(false);
    }

    return (
        <div id="newPostContainer">
            <div id="newPostBtnContainer">
                {!showCreatePost && (
                    <button onClick={newPostClick} id="newPostBtn">Create New Post</button>
                )}
            </div>
            
            <div id="postPopUpContainer">
                {showCreatePost ? (<NewPostPop id="inFront" closePopUp={closePopUp} />) : null}
            </div>
        </div>
    );
};

export default PostsCreation;
