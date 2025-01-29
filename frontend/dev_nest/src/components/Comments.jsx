import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getAllComments } from "../redux/slices/commentsSlice";
import RetrieveComments from "./RetrieveComments";
import '../styles/comment.css';

function Comments({ postid }) {

    const [commentData, setCommentData] = useState("")
    const [addComments, setAddComment] = useState(false);
    
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.comment);

    useEffect(() => {
        if(commentData !== ""){
            setAddComment(true);
        } else {
            setAddComment(false);
        }
    }, [commentData]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCommentData(value);
        
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ postid, commentData }));
        setCommentData("");  
        dispatch(getAllComments());
    }

    return (
        <div>
            <form id="addComment" onSubmit={handleSubmit}>
                <input type="text" placeholder="Add Comment.." id="addCommentForm" onChange={handleChange} value={commentData} style={{ cursor: "pointer" }}></input>
                {addComments ? <button type="submit" id="addCommentButton">+</button> : <p></p>}
                {loading ? <p>Adding...</p> : <p></p>}
                {error ? <p>{error}</p> : <p></p>}
            </form>
            
        </div>
    )

}

export default Comments;