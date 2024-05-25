const initialState = {
    messages: [],
    error: null,
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_MESSAGE_SUCCESS':
            return {
                ...state,
                messages: [...state.messages, action.payload],
                error: null,
            };
        case 'GET_MESSAGES_SUCCESS':
            return {
                ...state,
                messages: action.payload,
                error: null,
            };
        case 'SEND_MESSAGE_FAIL':
        case 'GET_MESSAGES_FAIL':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default messageReducer;
