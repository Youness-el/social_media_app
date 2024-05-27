import axios from 'axios';

export const createPost = (postData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/posts', postData);
        dispatch({ type: 'CREATE_POST_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'CREATE_POST_FAIL', payload: error.response.data });
    }
};

export const getPost = (postId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({ type: 'GET_POST_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_POST_FAIL', payload: error.response.data });
    }
};

export const updatePost = (postId, updatedData) => async (dispatch) => {
    try {
        await axios.put(`/api/posts/${postId}`, updatedData);
        dispatch({ type: 'UPDATE_POST_SUCCESS', payload: { postId, updatedData } });
    } catch (error) {
        dispatch({ type: 'UPDATE_POST_FAIL', payload: error.response.data });
    }
};

export const deletePost = (postId,userId) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${postId}`,{ data: { userId } });
        console.log({postId, userId})
        dispatch({ type: 'DELETE_POST_SUCCESS', payload:  postId });
    } catch (error) {
        dispatch({ type: 'DELETE_POST_FAIL', payload: error.response.data });
    }
};

export const likePost = (postId, userId) => async (dispatch) => {
    try {
        await axios.put(`/api/posts/${postId}/like`, { userId });
        dispatch({ type: 'LIKE_POST_SUCCESS', payload: { postId, userId } });
    } catch (error) {
        dispatch({ type: 'LIKE_POST_FAIL', payload: error.response.data });
    }
};

export const addComment = (postId, comment, userId) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/posts/${postId}/comment`, { userId, comment });
        const newComment = response.data.comment;
        dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: { postId, comment: newComment, userId } });
    } catch (error) {
        dispatch({ type: 'ADD_COMMENT_FAIL', payload: error.response.data });
    }
};


export const getPosts = (page) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts?page=${page}`);
      dispatch({ type: 'GET_POSTS_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'GET_POSTS_FAIL', payload: error.response.data });
    }
  };
