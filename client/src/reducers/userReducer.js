// userReducer.js

const initialState = {
    user: null,
    profile: null,
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
                following: action.payload.following,
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
        case 'FETCH_USER_PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_USER_PROFILE_SUCCESS':
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_USER_PROFILE_FAIL':
            return {
                ...state,
                profile: null,
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
        case 'ADD_COMMENT_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    posts: state.profile.posts.map(post => {
                        if (post._id === action.payload.postId) {
                            return {
                                ...post,
                                comments: [...post.comments, action.payload.comment],
                            };
                        }
                        return post;
                    }),
                },
            };
        default:
            return state;
    }
};

export default userReducer;


