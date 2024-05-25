import axios from 'axios';

export const sendMessage = (messageData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/messages', messageData);
        dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'SEND_MESSAGE_FAIL', payload: error.response.data });
    }
};

export const getMessages = (senderId, receiverId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/messages/${senderId}/${receiverId}`);
        dispatch({ type: 'GET_MESSAGES_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_MESSAGES_FAIL', payload: error.response.data });
    }
};
