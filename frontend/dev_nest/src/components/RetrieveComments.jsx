//Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../redux/slices/commentsSlice";
import "../styles/retrieveComments.css";

function RetrieveComments({ postid }) {

    //Initializing Component
    const [commentsForPost, setCommentsForPost] = useState([]);
    const dispatch = useDispatch();
    const { allComments } = useSelector((state) => state.comment);

    // Fetch all comments when the component mounts
    useEffect(() => {
        dispatch(getAllComments());
    }, [dispatch]);

    // Filter comments for the given postid whenever `allComments` or `postid` changes
    useEffect(() => {
        if (allComments) {
            const filteredComments = allComments.filter(
                (comment) => comment.postid === postid
            );
            setCommentsForPost(filteredComments);
        }
    }, [allComments, postid]);

    //Calculates how long since comment was added.
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
        <div>
            {commentsForPost.length ? commentsForPost.map((comment, index) => (
                <p key={index} id="commentdataContainer">{comment.commentdata} - {comment.username} - {calculateTimeElapsed(comment.created_at)}</p>
                
            )) : <p>No Comments Yet...</p>}
        </div>
    );
}

export default RetrieveComments;
