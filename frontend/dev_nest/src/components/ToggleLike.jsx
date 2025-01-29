import React, { useEffect } from "react";
import likeIcon from '../assets/likesAndComments/like.png';
import { useDispatch, useSelector } from "react-redux";
import { addLike, fetchAllLikes, removeLike } from "../redux/slices/likesSlice";
import '../styles/addLike.css';

function ToggleLike({ postid }) {
    const dispatch = useDispatch();
    const allLikes = useSelector((state) => state.likes.allLikes);
    const userid = useSelector((state) => state.login.user.userid)
    
    
    const isLiked = Array.isArray(allLikes[postid]) && allLikes[postid].find((like) => like.userid === userid) ? true : false;



    const handleClick = async () => {
        try {
            if(isLiked){
                await dispatch(removeLike({postid})).unwrap();
            } else {
                await dispatch(addLike({postid, userid})).unwrap();
            }
            await dispatch(fetchAllLikes()).unwrap();
        } catch (err) {
            console.error("error updating likes: ", err);
        }
        
    }

    return (
        <div>
            <img
                src={likeIcon}
                id="likeIcon"
                className={`like-icon ${isLiked ? 'liked' : ''}`}
                onClick={() => handleClick()}
                alt="like"
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
}

export default ToggleLike;
