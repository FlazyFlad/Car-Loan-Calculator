import React from 'react';
import './Profile.css'; // Import your CSS file for styling if needed
import avatarUrl from './user-avatar.png';

const Profile = () => {
    const user = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        avatarUrl: 'path/to/avatar-image.jpg' // URL of the avatar image
    };

    return (
        <div className="profile-container">
            <div className="left-section">
                {/* User Avatar */}
                {/* <img src={user.avatarUrl} alt="User Avatar" className="avatar" /> */}
                <img src={avatarUrl} alt="User Avatar" className="avatar" />
                <h2>{user.username}</h2>
            </div>
            <div className="right-section">
                {/* User Information */}
                <h3>User Information</h3>
                <p><strong>Email:</strong> {user.email}</p>
                {/* Display other user information */}
            </div>
        </div>
    );
}

export default Profile;
