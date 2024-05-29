import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import { BsFillImageFill, BsCameraVideoFill } from 'react-icons/bs';
import { createPost } from '../actions/postActions';

const AddPost = ({ show, handleClose }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      userId: user._id,
      content,
      imageUrl: selectedImage,
    };
    dispatch(createPost(postData));
    setContent('');
    setSelectedImage(null);
    handleClose();
  };

  return (
    <>
      <style type="text/css">
        {`
          .custom-modal-body {
            display: flex;
            flex-direction: column;
            height: 80vh;
            overflow-y: auto;
          }

          .modal-image-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
            overflow: hidden;
          }

          .modal-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          .post-content {
            flex-shrink: 0;
            padding: 20px;
            width: 100%;
          }

          @media (min-width: 768px) {
            .custom-modal-body {
              flex-direction: row;
            }

            .modal-image-container {
              flex-grow: 1;
              height: auto;
              max-width: 60%;
            }

            .post-content {
              flex-shrink: 0;
              padding: 20px;
              width: 40%;
            }
          }
        `}
      </style>
      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 custom-modal-body">
          <Form onSubmit={handleSubmit} className="w-100 h-100 d-flex flex-column flex-md-row" encType="multipart/form-data">
            {!selectedImage ? (
              <div className="d-flex flex-column align-items-center justify-content-center p-5 w-100">
                <div className="mb-3">
                  <BsFillImageFill size={50} className="me-3" />
                  <BsCameraVideoFill size={50} />
                </div>
                <h5 className="text-center mb-3">Drag photos and videos here</h5>
                <Button variant="primary" onClick={() => document.getElementById('fileUpload').click()}>
                  Select from computer
                </Button>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <>
                <div className="modal-image-container">
                  <Image src={selectedImage} alt="Selected" className="modal-image" />
                </div>
                <div className="post-content">
                  <Form.Group controlId="postContent">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write a caption..."
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">
                    Post
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPost;
