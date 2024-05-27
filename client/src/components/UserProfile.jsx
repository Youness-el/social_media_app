import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostsList from './PostsList'; // Assuming you have a PostsList component

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const userId = useSelector(state => state.user.user._id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        console.log(response)
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-info">
        <img src={userData.profilePicture} alt="Profile" />
        <h2>{userData.username}</h2>
        <p>Followers: {userData.followers.length}</p>
        <p>Following: {userData.following.length}</p>
        <p>Posts: {userData.posts.length}</p>
        {userId === userData._id ? (
          // If the logged-in user is viewing their own profile
          <button>Edit Profile</button>
        ) : (
          // If a guest is viewing someone else's profile
          <div>
            <button>Follow</button>
            <button>Message</button>
          </div>
        )}
      </div>
      <div className="user-posts">
        {userData.posts.length > 0 ? (
          <PostsList posts={userData.posts} />
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
