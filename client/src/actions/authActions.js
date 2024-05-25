import axios from 'axios';

export const register = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/register', userData);
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
};

export const login = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/login', userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

export const logout = () => async (dispatch) => {
    try {
        // Assuming there's an endpoint for logout if necessary, otherwise just dispatch the action
        // await axios.post('/api/auth/logout');
        dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data });
    }
};

export const checkAuthStatus = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await axios.get('/api/auth/status', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } else {
            dispatch({ type: 'LOGIN_FAIL', payload: 'No token found' });
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};
