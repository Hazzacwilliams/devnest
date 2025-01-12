import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/newPostPop.css';
import { createNewPost } from "../../redux/slices/newPostSlice";

function NewPostPop({ closePopUp }){

    const [formData, setFormData] = useState({
        posttitle: '',
        postdata: ''
    });

    const dispatch = useDispatch();
    const { post, loading, error } = useSelector((state) => state.newPost);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data being sent to redux: ", formData);
        dispatch(createNewPost(formData));

    }

    const handleClose = (e) => {
        e.preventDefault();
        closePopUp();
    }

    return (
        <form id="newPostPopUp" onSubmit={handleSubmit}>
            <input type="text" name="posttitle" value={formData.posttitle} placeholder="TITLE" id="popUpTitle" onChange={handleInput}></input>
            <input type="text" name="postdata" value={formData.postdata} placeholder="TYPE NEW POST..." id="popUpPost" onChange={handleInput}></input>
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Post'}
            </button>
            <button id="closePopUp" type="button" onClick={handleClose}>Cancel</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {post && <p>Post created successfully: {post.title}</p>}
        </form> 
    )
};

export default NewPostPop;