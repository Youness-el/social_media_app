import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { checkAuthStatus } from './actions/authActions';
import Header from './components/Header';
import { loadUser } from './actions/userActions';
import UserProfile from './components/UserProfile';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.authenticated);
    const authChecked = useSelector((state) => state.auth.authChecked);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated]);

    const API_URL = import.meta.env.VITE_APP_API_URL;
    axios.defaults.baseURL = API_URL;
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            {isAuthenticated && <Header />}
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:username" element={<UserProfile />} />
                    {/* Other private routes */}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
