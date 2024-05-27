const initialState = {
    user: null,
    authenticated: false,
    authChecked: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                authChecked: true,
                error: null,
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                user: null,
                authenticated: false,
                authChecked: true,
                error: action.payload,
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
                authenticated: false,
                authChecked: true,
                error: null,
            };
        case 'AUTH_CHECKED':
            return {
                ...state,
                authChecked: true,
            };
        default:
            return state;
    }
};

export default authReducer;
