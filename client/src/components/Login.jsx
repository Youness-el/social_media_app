import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ identifier, password }));
        navigate('/')
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicIdentifier">
                            <Form.Label>Username or Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username or email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Link to="/register">Dont have an account? Register here.</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
