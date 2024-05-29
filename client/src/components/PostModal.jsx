import React, { useReducer, useState } from "react";
import { Modal, Image, Button, Form } from "react-bootstrap";
import { BsHeartFill, BsChatFill, BsEmojiSmile } from "react-icons/bs";
import moment from "moment";
import { likePost, deletePost } from "../actions/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addComment } from "../actions/userActions";
import "./style.css";
const PostModal = ({ post, onHide, userId }) => {
  // console.log(`${post.userId.username},${userId}`)
  const [commentInput, setCommentInput] = useState("");
  const timeDifference = moment(post.createdAt).fromNow();
  const [liked, setLiked] = useState(
    post.likes.some((like) => like._id === userId)
  ); // Check if userId is in the likes array
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleLike = () => {
    setLiked(!liked);
    dispatch(likePost(post._id, userId));
  };
  const handledeletePost = () => {
    setLiked(!liked);
    dispatch(deletePost(post._id, userId));
  };
  const handlePostComment = () => {
    // Add logic to post the comment
    console.log("Posting comment:", commentInput);
    // Clear comment input after posting
    dispatch(addComment(post._id, commentInput, userId));
    setCommentInput("");
  };

  return (
    <Modal
      show
      onHide={onHide}
      centered
      dialogClassName="custom-modal"
      size="lg"
    >
      <Modal.Body className="p-0 modal-body-custom">
        <div className="row no-gutters modal-content-custom">
          <div className="col-md-7 modal-image-section">
            <Image src={post.imageUrl} alt="post" className="modal-image" />
          </div>
          <div className="col-md-5 p-3 modal-content-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <Image
                  src={post.userId.profilePicture}
                  alt="user profile"
                  roundedCircle
                  width="50"
                  height="50"
                  className="me-3"
                />
                <h5 className="m-0">{post.userId.username}</h5>
              </div>
              <div>
                <Button variant="link" className="text-dark me-2">
                  {post.userId._id === userId ? (
                    <button
                      className="btn btn-danger"
                      onClick={handledeletePost}
                    >
                      Delete
                    </button>
                  ) : null}
                </Button>
                <Button variant="link" className="text-dark" onClick={onHide}>
                  Cancel
                </Button>
              </div>
            </div>
            <hr />
            <div className="comments-section">
              {post.comments.map((comment, index) => (
                <div
                  key={index}
                  className="d-flex align-items-start mb-2 comment-item"
                >
                  <Image
                    src={comment.userId.profilePicture}
                    alt="comment userId"
                    roundedCircle
                    width="30"
                    height="30"
                    className="me-2"
                  />
                  <div>
                    <h6 className="m-0">{comment.userId.username}</h6>
                    <p className="m-0">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="post-actions mt-0">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={liked ? faHeartSolid : faHeartRegular}
                  onClick={handleLike}
                  className="me-3"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  icon={faComment}
                  // onClick={handlePostComment}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </div>
              {post.likes.length} Likes <br />
              <p className="text-muted small">{timeDifference}</p>
            </div>
            <Form className="comment-form d-flex align-items-center mt-3">
              <Form.Control
                type="text"
                placeholder="Add a comment..."
                className="me-2"
                value={commentInput}
                onChange={handleInputChange}
              />
              <Button variant="primary" onClick={handlePostComment}>
                Post
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
