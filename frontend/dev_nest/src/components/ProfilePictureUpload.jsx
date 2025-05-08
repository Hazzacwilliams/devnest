//Imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../redux/slices/loginSlice.js';
import "../styles/profilePictureUpload.css";


function ProfilePictureUpload() {

    //Initializing Component
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //Handles picture upload, API request done in component as doesnt need state management and is likely a one of request.
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/upload-profile-picture`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setMessage('Profile picture uploaded successfully!');
                dispatch(updateProfilePicture(data.profilepic_url));
            } else {
                setMessage('Failed to upload profile picture.');
            }
        } catch (err) {
            setMessage('Error uploading file.');
        }
    };

    return (
        <div id="profilePictureUpload">
            <label htmlFor='profilepicinput' className='custom-file-upload'>
                📎 CHOOSE PROFILE PICTURE 📎
            </label>
            <input type="file" id='profilepicinput' onChange={handleFileChange}  style={{ display: "none" }}/>
            {file && <button onClick={handleUpload}>Upload</button>}
            
            {message && <p>{message}</p>}
        </div>
    );
}

export default ProfilePictureUpload;
