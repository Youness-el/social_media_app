/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Axios} from 'axios';
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
console.log("import.meta.env.REACT_APP_API_URL",import.meta.env.REACT_APP_API_URL)
    Axios.defaults.baseURL = import.meta.env.REACT_APP_API_URL;

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
