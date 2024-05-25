import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
// import Posts from './components/Posts';
// import Messages from './components/Messages';
import PrivateRoute from './components/PrivateRoute';
import { checkAuthStatus } from './actions/authActions';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    // axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/posts" element={<Posts />} />
                    <Route path="/messages" element={<Messages />} /> */}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
