import axios from 'axios';

export const loadUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        // if(token){console.log('token')}else{console.log('no token')}
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

export const fetchUserProfile = (username) => async (dispatch) => {
    dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' }); // Add a request action
    try {
        const res = await axios.get(`/api/users/findbyusername/${username}`);
        dispatch({ type: 'FETCH_USER_PROFILE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'FETCH_USER_PROFILE_FAIL', payload: error.response.data });
    }
};
export const fetchUserProfilebyId = (userId) => async (dispatch) => {
    dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' }); // Add a request action
    try {
        const res = await axios.get(`/api/users/findbyId/${userId}`);
        dispatch({ type: 'FETCH_USER_PROFILE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'FETCH_USER_PROFILE_FAIL', payload: error.response.data });
    }
};
export const follow = (userId, followId) => async (dispatch) => {
    try {
      const response = await axios.put(`/api/users/follow/${followId}`, { userId });
      dispatch({ type: 'FOLLOW_SUCCESS', payload: { followId, userId } });
      // Fetch updated user profile to reflect changes
    //   dispatch(fetchUserProfilebyId(followId));
    } catch (error) {
      dispatch({ type: 'FOLLOW_FAIL', payload: error.response.data });
    }
  };
  
  export const unfollow = (userId, unfollowId) => async (dispatch) => {
    try {
      const response = await axios.put(`/api/users/unfollow/${unfollowId}`, { userId });
      dispatch({ type: 'UNFOLLOW_SUCCESS', payload: { unfollowId, userId } });
      // Fetch updated user profile to reflect changes
    //   dispatch(fetchUserProfilebyId(unfollowId));
    } catch (error) {
      dispatch({ type: 'UNFOLLOW_FAIL', payload: error.response.data });
    }
  };


export const addCommentSuccess = (postId, comment) => ({
    type: 'ADD_COMMENT_SUCCESS',
    payload: { postId, comment },
});

export const addComment = (postId, comment, userId) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/posts/${postId}/comment`, { userId, comment });
        const newComment = response.data.comment;
        dispatch(addCommentSuccess(postId, newComment));
    } catch (error) {
        console.error('Error adding comment:', error);
    }
};

export const getUsersByUsername = (username) => async (dispatch) => {
    try {
      dispatch({ type: "GET_USERS_BY_USERNAME_REQUEST" });
      const { data } = await axios.get(`/api/users/search?username=${username}`);
      dispatch({ type: "GET_USERS_BY_USERNAME_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_USERS_BY_USERNAME_FAIL", payload: error.response.data.message });
    }
  };