import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Alert, Image, Modal } from 'react-bootstrap';
import Resizer from 'react-image-file-resizer';
import { register } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [previewURL, setPreviewURL] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalVariant, setModalVariant] = useState('');
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            const file = e.target.files[0];
            if (file) {
                Resizer.imageFileResizer(
                    file,
                    300, // max width
                    300, // max height
                    'JPEG',
                    70, // quality
                    0,
                    uri => {
                        setProfilePicture(uri);
                        setPreviewURL(uri);
                    },
                    'base64'
                );
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.set("password", formData.password);
            data.set("email", formData.email);
            data.set("username", formData.username);

            if (profilePicture) {
                data.set("profilePicture", profilePicture);
            }
            await dispatch(register(data));
            setValidationErrors({});
            setModalContent('Registration successful! You can now login.');
            setModalVariant('success');
            setShowModal(true);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.validationErrors) {
                setValidationErrors(err.response.data.validationErrors);
                setModalContent('Registration failed. Please check your inputs.');
                setModalVariant('danger');
            } else {
                console.error('Error registering user:', err);
                setModalContent('An unexpected error occurred. Please try again later.');
                setModalVariant('danger');
            }
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalVariant === 'success') {
            navigate('/login');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Register</h2>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={validationErrors.username}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={validationErrors.email}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={validationErrors.password}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicProfilePicture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                name="profilePicture"
                                onChange={handleChange}
                                isInvalid={validationErrors.profilePicture}
                                accept="image/*"
                            />
                            {previewURL && <Image src={previewURL} alt="Profile Preview" className="mt-2" style={{ maxWidth: '100px' }} />}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <div className="mt-2">
                            <p>
                                Already have an account? <a href="/login">Login here</a>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalVariant === 'success' ? 'Success' : 'Error'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={modalVariant === 'success' ? 'success' : 'danger'} onClick={handleCloseModal}>
                        {modalVariant === 'success' ? 'Go to Login' : 'Close'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Register;
