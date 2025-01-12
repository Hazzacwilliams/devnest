import React from "react";
import '../styles/likeAndComments.css';
import AddLike from "./AddLike";

function LikesAndComments({ postid }){

    return (
        <div id="likesAndCommentsContainer">
            <div id="likeCounterContainer">
                <AddLike postid={postid}/>
                
                <div>0 </div>
            </div>
            <span> | </span>
            <div id="commentsContainer">
                <span>COMMENTS</span>
            </div>
        </div>
    )
}

export default LikesAndComments;