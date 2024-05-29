import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const SearchUserItem = ({ _id, username, profilePicture }) => {
  const location = useLocation();
  const currentUserId = useSelector((state)=>state.user.user._id); // Replace this with the actual current user's ID
console.log(location.pathname)
  const linkPath = location.pathname.includes('messages')
    ? `/chat/${currentUserId}/${_id}`
    : `/profile/${username}`;

  return (
    <Link to={linkPath} className="d-flex align-items-center p-2">
      <img className="rounded-circle" src={profilePicture} alt="avatar" width="40" height="40" />
      <div className="ml-2">
        <span className="font-weight-bold">{username}</span>
      </div>
    </Link>
  );
};

export default SearchUserItem;
