import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, deletePost, addComment } from "../actions/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import { faEllipsisH, faTimes } from "@fortawesome/free-solid-svg-icons";

const PostsItem = ({ post, userId }) => {
  const [liked, setLiked] = useState(post.likes.includes(userId));
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [commentInputVisible, setCommentInputVisible] = useState(false);

  const handleComment = () => {
    setShowComments(!showComments);
    setCommentInputVisible(false); // Hide the comment input when showing comments
  };

  const handleLike = () => {
    setLiked(!liked);
    dispatch(likePost(post._id, userId));
  };

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleDoubleTap = () => {
    setLiked(!liked);
    dispatch(likePost(post._id, userId));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(addComment(post._id, comment, userId));
    // Dispatch an action to add the comment to the post
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id, userId));
    // console.log(post.userId._id === userId)
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const timeDifference = moment(post.createdAt).fromNow();

  return (
    <div className="card mb-3">
      <div className="card-header d-flex align-items-center">
        <img
          src={post.userId.profilePicture}
          className="rounded-circle mr-2"
          style={{ width: "35px", height: "35px" }}
          alt="Profile"
        />
        <div className="flex-grow-1 ms-2">
          <strong>{post.userId.username}</strong>
          <span className="text-muted"> • {timeDifference}</span>
        </div>
        <span className="ml-auto" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </span>
      </div>

      <div className="card-body p-0">
        <img
          src={post.imageUrl}
          className="img-fluid"
          onDoubleClick={handleDoubleTap}
          alt="Post"
        />
      </div>

      <div className="card-footer">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={liked ? faHeartSolid : faHeartRegular}
            onClick={handleLike}
            className="me-3"
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
          <FontAwesomeIcon
            icon={faComment}
            onClick={handleComment}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </div>
        <div>
          {post.likes.length} likes
          <br />
          <strong>{post.userId.username}</strong> {post.content}
          <div>
            {post.comments.length === 0 ? (
              <span>No comments</span>
            ) : (
              <span onClick={handleComment}>
                View {post.comments.length} comments
              </span>
            )}
          </div>
          {showComments && (
            <div className="comments mt-3 w-100">
              {post.comments.map((comment) => (
                <div key={comment._id} className="mt-2">
                  <strong>{comment.userId.username}</strong> {comment.content}
                </div>
              ))}
            </div>
          )}
          {showComments && !commentInputVisible && (
            <button
              onClick={() => setCommentInputVisible(true)}
              className="btn btn-primary mt-3"
            >
              Add a comment
            </button>
          )}
          {commentInputVisible && (
            <form onSubmit={handleSubmitComment} className="mt-3 w-100">
              <input
                type="text"
                value={comment}
                onChange={handleCommentInputChange}
                placeholder="Write a comment..."
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
              <button
                onClick={() => setCommentInputVisible(false)}
                className="btn btn-secondary ms-2"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Post Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {post.userId._id === userId ? (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostsItem;
