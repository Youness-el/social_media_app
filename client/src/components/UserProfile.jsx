import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchUserProfile, follow, unfollow } from "../actions/userActions";
import { Image, Button ,Modal, ListGroup} from "react-bootstrap";
import { BsHeartFill, BsChatFill } from "react-icons/bs";
import PostModal from "./PostModal";
import "./style.css";


const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate()
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile(username)).then(() => setLoading(false));
  }, [dispatch, username]);

  useEffect(() => {
    if (user && profile) {
      setIsFollowing(user.following.includes(profile._id));
    }
  }, [user, profile]);

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

  const handleFollow = () => {
    dispatch(follow(user._id, profile._id)).then(() => {
      setIsFollowing(true);
    });
  };

  const handleUnFollow = () => {
    dispatch(unfollow(user._id, profile._id)).then(() => {
      setIsFollowing(false);
    });
  };

  const handleShowFollowers = () => {
    setShowFollowers(true);
  };

  const handleShowFollowing = () => {
    setShowFollowing(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleCloseFollowers = () => {
    setShowFollowers(false);
  };

  const handleCloseFollowing = () => {
    setShowFollowing(false);
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
          <strong>{profile.posts.length} </strong>posts
          <strong className="ms-3" onClick={handleShowFollowers} style={{ cursor: 'pointer' }}>
            {profile.followers.length} </strong>followers
          <strong className="ms-3" onClick={handleShowFollowing} style={{ cursor: 'pointer' }}>
            {profile.following.length} </strong>following
          <br />
          {!isCurrentUser && (
            <div className="mt-3">
              {isFollowing ? (
                <Button variant="danger" className="me-2" onClick={handleUnFollow}>
                  Unfollow
                </Button>
              ) : (
                <Button variant="primary" className="me-2" onClick={handleFollow}>
                  Follow
                </Button>
              )}
              <Button variant="success" className="me-2" onClick={() => navigate(`/chat/${user._id}/${profile._id}`)}>
                Message
              </Button>
            </div>
          )}
          {isCurrentUser && (
            <Button variant="secondary" className="mt-3">
              Edit Profile
            </Button>
          )}
        </section>
      </section>
     {/* Followers Modal */}
<Modal show={showFollowers} onHide={handleCloseFollowers}>
  <Modal.Header closeButton>
    <Modal.Title>Followers</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {profile.followers.length === 0 ? (
      <div>No followers yet.</div>
    ) : (
      <ListGroup>
        {profile.followers.map((follower) => (
          <ListGroup.Item key={follower._id} className="d-flex align-items-center">
            <Image
              src={follower.profilePicture}
              alt={follower.username}
              roundedCircle
              width="40px"
              height="40px"
              className="me-3"
            />
            <Link to={`/profile/${follower.username}`}>
              <span>{follower.username}</span>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </Modal.Body>
</Modal>

{/* Following Modal */}
<Modal show={showFollowing} onHide={handleCloseFollowing}>
  <Modal.Header closeButton>
    <Modal.Title>Following</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {profile.following.length === 0 ? (
      <div>Not following anyone yet.</div>
    ) : (
      <ListGroup>
        {profile.following.map((following) => (
          <ListGroup.Item key={following._id} className="d-flex align-items-center">
            <Image
              src={following.profilePicture}
              alt={following.username}
              roundedCircle
              width="40px"
              height="40px"
              className="me-3"
            />
            <Link to={`/profile/${following.username}`}>
              <span>{following.username}</span>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </Modal.Body>
</Modal>


      <hr className="mt-4" />

      <section className="row mt-4">
      {profile.posts.map((post) => (
        <article key={post._id} className="col-12 col-sm-6 col-md-4 mt-4">
          <a onClick={() => handlePostClick(post)} type="button">
            <div className="container-article square">
              <Image
                src={post.imageUrl}
                alt="post title"
                className="img-fluid square-image"
                fluid
              />
              <div className="overlay">
                <div className="text">
                  <BsHeartFill className="like-icon" /> {post.likes.length}{" "}
                  <BsChatFill className="comment-icon" /> {post.comments.length}
                </div>
              </div>
            </div>
          </a>
        </article>
      ))}
    </section>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onHide={handleCloseModal}
          userId={user._id}
        />
      )}
    </main>
  );
};

export default UserProfile;
