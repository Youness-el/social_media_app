import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostsList from './PostsList';

const Home = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h2>Home</h2>
                    <PostsList />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
