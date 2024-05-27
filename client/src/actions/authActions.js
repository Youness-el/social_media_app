// authActions.js

import axios from 'axios';
import { loadUser } from './userActions';

export const register = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        console.log('Form data before sending:', formData); // Log the form data before sending

        const res = await axios.post('/api/auth/register', formData, config);

        console.log('Response from server:', res); // Log the response from the server

        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (error) {
        console.error('Error registering user:', error); // Log any errors that occur
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
};





export const login = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/login', userData);
        localStorage.setItem('token',res.data.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

export const logout = () => async (dispatch) => {
    try {
        // Assuming there's an endpoint for logout if necessary, otherwise just dispatch the action
        // await axios.post('/api/auth/logout');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data });
    }
};

export const checkAuthStatus = (token) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await axios.get('/api/auth/status', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            dispatch(loadUser());
        } else {
            dispatch({ type: 'LOGIN_FAIL', payload: 'No token found' });
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data || 'Error' });
    } finally {
        dispatch({ type: 'AUTH_CHECKED' });
    }
};

