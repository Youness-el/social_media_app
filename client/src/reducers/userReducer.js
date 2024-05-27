const initialState = {
    user: null,
    following: [],
    error: null,
    loading: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                following: action.payload.following, // Assuming the following data is part of the user payload
                loading: false,
                error: null,
            };
        case 'LOAD_USER_FAIL':
            return {
                ...state,
                user: null,
                following: [],
                loading: false,
                error: action.payload,
            };
        case 'FOLLOW_SUCCESS':
            return {
                ...state,
                following: [...state.following, action.payload],
                error: null,
            };
        case 'UNFOLLOW_SUCCESS':
            return {
                ...state,
                following: state.following.filter(id => id !== action.payload),
                error: null,
            };
        case 'FOLLOW_FAIL':
        case 'UNFOLLOW_FAIL':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
