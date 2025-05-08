//Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getAllComments } from "../redux/slices/commentsSlice";
import '../styles/comment.css';

function Comments({ postid }) {

    //Initalizing component
    const [commentData, setCommentData] = useState("")
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.comment);

    //Updates commentData as user types.
    const handleChange = (e) => {
        const value = e.target.value;
        setCommentData(value);
    };

    //Prevents default behaviour and dispatches users comment to store.
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
                {commentData.trim() !== "" && <button type="submit" id="addCommentButton">+</button>} {/*Appends plus button only when user has typed*/}
                {/*Loading and Error Handling*/}
                {loading ? <p>Adding...</p> : <p></p>}
                {error ? <p>{error}</p> : <p></p>}
            </form>
        </div>
    )
}

export default Comments;