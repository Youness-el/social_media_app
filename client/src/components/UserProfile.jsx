import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../actions/userActions";
import { Image, Button } from "react-bootstrap";
import { BsHeartFill, BsChatFill } from "react-icons/bs";
import PostModal from './PostModal';
import './style.css';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.user.profile);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile(username)).then(() => setLoading(false));
  }, [dispatch, username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data found</div>;
  }

  const isCurrentUser = user && user.username === username;

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <main className="container mt-4">
      <section id="header" className="row">
        <section className="col-md-4 col-3 text-center">
          <Image
            src={profile.profilePicture}
            alt="Profile"
            roundedCircle
            fluid
            width="150px"
          />
        </section>
        <section className="col-md-8 col-7 ps-4 mt-3">
          <h1 className="h4 fs-4">{profile.username}</h1>
          <strong>{profile.posts.length} </strong>posts<strong className="ms-3">{profile.followers.length} </strong>followers<strong className="ms-3">{profile.following.length} </strong>following <br />

          {!isCurrentUser && (
            <div className="mt-3">
              <Button variant="primary" className="me-2">Follow</Button>
              <Button variant="success" className="me-2">Message</Button>
            </div>
          )}
          {isCurrentUser && (
            <Button variant="secondary" className="mt-3">Edit Profile</Button>
          )}
        </section>
      </section>

      <hr className="mt-4" />

      <section className="row mt-4">
        {profile.posts.map((post) => (
          <article key={post._id} className="col-md-4 mt-4">
            <a onClick={() => handlePostClick(post)} type="button">
              <div className="container-article">
                <Image src={post.imageUrl} alt="post title" className="image" fluid />
                <div className="overlay">
                  <div className="text">
                    <BsHeartFill className="like-icon" /> {post.likes.length} <BsChatFill className="comment-icon" /> {post.comments.length}
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </section>

      {selectedPost && (
        <PostModal post={selectedPost} onHide={handleCloseModal} userId={user._id}/>
      )}
    </main>
  );
};

export default UserProfile;
