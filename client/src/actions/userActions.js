import axios from 'axios';

export const loadUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if(token){console.log('token')}else{console.log('no token')}
        const res = await axios.get('/api/users/data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: 'LOAD_USER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'LOAD_USER_FAIL', payload: error.response.data });
    }
};

export const follow = (userId, followId) => async (dispatch) => {
    try {
        await axios.put(`/api/users/${followId}/follow`, { userId });
        dispatch({ type: 'FOLLOW_SUCCESS', payload: followId });
    } catch (error) {
        dispatch({ type: 'FOLLOW_FAIL', payload: error.response.data });
    }
};

export const unfollow = (userId, unfollowId) => async (dispatch) => {
    try {
        await axios.put(`/api/users/${unfollowId}/unfollow`, { userId });
        dispatch({ type: 'UNFOLLOW_SUCCESS', payload: unfollowId });
    } catch (error) {
        dispatch({ type: 'UNFOLLOW_FAIL', payload: error.response.data });
    }
};
