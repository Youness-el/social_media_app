const initialState = {
    user: null,
    authenticated: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                error: null,
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
                authenticated: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
