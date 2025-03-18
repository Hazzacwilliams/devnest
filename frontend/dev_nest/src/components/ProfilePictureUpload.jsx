import React, { useState } from 'react';

function ProfilePictureUpload({ userid }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/upload-profile-picture`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setMessage('Profile picture uploaded successfully!');
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
