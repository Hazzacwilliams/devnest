import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../redux/slices/loginSlice.js';


function ProfilePictureUpload({ userid }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ProfilePictureUpload;
