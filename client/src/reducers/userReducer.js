// userReducer.js

const initialState = {
    user: null,
    profile: null,
    following: [],
    followers: [], // Add followers to the initial state
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
          followers: action.payload.followers, // Add followers to the state
          loading: false,
          error: null,
        };
      case 'LOAD_USER_FAIL':
        return {
          ...state,
          user: null,
          following: [],
          followers: [], // Reset followers on load fail
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
          user: {
            ...state.user,
            following: [...state.user.following, action.payload],
          },
          profile: {
            ...state.profile,
            followers: [...state.profile.followers, state.user._id],
          },
        };
      case 'UNFOLLOW_SUCCESS':
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter((id) => id !== action.payload),
          },
          profile: {
            ...state.profile,
            followers: state.profile.followers.filter((id) => id !== state.user._id),
          },
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
            posts: state.profile.posts.map((post) => {
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
      case 'GET_USERS_BY_USERNAME_REQUEST':
        return { ...state, loading: true };
      case 'GET_USERS_BY_USERNAME_SUCCESS':
        return { ...state, loading: false, users: action.payload, error: null };
      case 'GET_USERS_BY_USERNAME_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  