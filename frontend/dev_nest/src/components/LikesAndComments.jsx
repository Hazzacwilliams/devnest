import React from "react";
import { useSelector } from "react-redux";
import '../styles/likeAndComments.css';
import commentIcon from '../assets/likesAndComments/comment.png';
import ToggleLike from "./ToggleLike";
import GetLikes from "./GetLikes";
import Comments from "./Comments";

function LikesAndComments({ postid, toggleComments }){
   
    const { allLikes } = useSelector((state) => state.likes);

    const likesCount = Array.isArray(allLikes[postid]) ? allLikes[postid].length : 0;


    return (
        <div id="likesAndCommentsContainer">
            <div id="likeCounterContainer">
            
                <GetLikes likesCount={likesCount} />
                <ToggleLike postid={postid} />
                
            </div>
            <div id="commentsContainer">
                <img src={commentIcon} id="commentIcon" onClick={() => toggleComments(postid)}/>
            </div>
        </div>
    )
}

export default LikesAndComments;