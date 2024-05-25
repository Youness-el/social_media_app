const initialState = {
    following: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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
