import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/newPostPop.css';
import { createNewPost, resetNewPostState } from "../../redux/slices/newPostSlice";
import { recievePosts } from "../../redux/slices/recievePostsSlice";
import { ClipLoader } from "react-spinners";

function NewPostPop({ closePopUp }) {

    const [formData, setFormData] = useState({
        posttitle: '',
        postdata: ''
    });
    const [media, setMedia] = useState();

    const dispatch = useDispatch();
    const { post, loading, error } = useSelector((state) => state.newPost);

    useEffect(() => {
        dispatch(resetNewPostState());

        return () => {
            dispatch(resetNewPostState());
        };
    }, [dispatch]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setMedia([...e.target.files]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("posttitle", formData.posttitle);
        formDataToSend.append("postdata", formData.postdata);
        if (media) {
            media.forEach(file => formDataToSend.append("media", file));
        }
        try {
            await dispatch(createNewPost(formDataToSend)).unwrap();
            await dispatch(recievePosts());
            closePopUp();
        } catch (err) {
            console.error("Failed to create posts:", err);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        closePopUp();
    }

    return (
        <div className="newPostOverlay">
            <form id="newPostPopUp" onSubmit={handleSubmit}>
                <input type="text" name="posttitle" value={formData.posttitle} placeholder="TITLE" id="popUpTitle" onChange={handleInput}></input>
                <input type="text" name="postdata" value={formData.postdata} placeholder="TYPE NEW POST..." id="popUpPost" onChange={handleInput}></input>
                <label htmlFor="popUpMedia" className="custom-file-upload">
                    📎 CHOOSE FILES 📎
                </label>
                <input type="file" name="postmedia" id="popUpMedia" onChange={handleFileChange} multiple accept="image/*,video/*"></input>
                <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {loading ? (
                        <>
                            <ClipLoader color="#ffffff" size={18} />
                            Creating...
                        </>
                    ) : (
                        "Create Post"
                    )}
                </button>

                <button id="closePopUp" type="button" onClick={handleClose}>Cancel</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {post && <p>Post created successfully: {post.title}</p>}
            </form>
        </div>

    )
};

export default NewPostPop;