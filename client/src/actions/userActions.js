import axios from 'axios';

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
