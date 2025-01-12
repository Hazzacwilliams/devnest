import React, { useEffect } from "react";
import likeIcon from '../assets/likesAndComments/like.png';
import { useSelector, useDispatch } from "react-redux";
import { addLike } from "../redux/slices/addLikeSlice";
import '../styles/addLike.css';


function AddLike({ postid }){

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addLike({ postid: postid }));
    };

    return (
        <div>
            <img src={likeIcon} id="likeIcon" onClick={handleClick} />
        </div>
    )
};

export default AddLike;