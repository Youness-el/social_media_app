import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { loadUser } from '../actions/userActions';
import AddPost from './AddPost';
import { FaEnvelope, FaCamera } from 'react-icons/fa';
import SearchBox from './SearchBox';

const Header = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    history('/login');
  };

  const handleShowAddPost = () => {
    setShowAddPost(true);
  };

  const handleCloseAddPost = () => {
    setShowAddPost(false);
    history('/');
  };

  if (loading || !user) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Navbar.Brand as={Link} to="/">AppName</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <SearchBox />
        </Nav>
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link as={Link}  to={`/messages/${user._id}`}>
            <FaEnvelope size={24} />
          </Nav.Link>
          <Nav.Link onClick={handleShowAddPost}>
            <FaCamera size={24} />
          </Nav.Link>
          <Dropdown align={'end'}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <img
                src={user.profilePicture}
                alt="User"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user.username}`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      {/* AddPost Modal */}
      <AddPost show={showAddPost} handleClose={handleCloseAddPost} />
    </>
  );
};

export default Header;
