// Header.jsx
import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import { loadUser } from "../actions/userActions";

const Header = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  // const username = user.username; // Extract username from user state

  const handleLogout = () => {
    dispatch(logout());
    history("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        AppName
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="ml-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/messages">
            <i className="fas fa-envelope"></i> Messages
          </Nav.Link>
          <Nav.Link as={Link} to="/add-post">
            <i className="fas fa-plus-circle"></i> Add Post
          </Nav.Link>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {/* <Image
                src={user.profilePicture}
                roundedCircle
                width="30"
                height="30"
              /> */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item as={Link} to={`/profile/${username}`}> 
                Profile
              </Dropdown.Item> */}
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
