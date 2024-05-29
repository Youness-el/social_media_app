const initialState = {
    posts: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'CREATE_POST_SUCCESS':
          return {
              ...state,
              posts: [...state.posts, action.payload],
              error: null,
          };
          case 'GET_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.payload.currentPage === 1 ? action.payload.posts : [...state.posts, ...action.payload.posts],
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
          case 'GET_POSTS_FAIL':
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      case 'UPDATE_POST_SUCCESS':
          return {
              ...state,
              posts: state.posts.map((post) =>
                  post._id === action.payload.postId
                      ? action.payload.updatedData
                      : post
              ),
              error: null,
          };
          case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
                error: null,
            };
        
      case 'LIKE_POST_SUCCESS':
          return {
              ...state,
              posts: state.posts.map((post) =>
                  post._id === action.payload.postId
                      ? { ...post, likes: [...post.likes, action.payload.userId] }
                      : post
              ),
              error: null,
          };
      case 'ADD_COMMENT_SUCCESS':
          return {
              ...state,
              posts: state.posts.map((post) =>
                  post._id === action.payload.postId
                      ? {
                          ...post,
                          comments: [...post.comments, { 
                              _id: action.payload.comment._id, 
                              userId: action.payload.comment.userId, 
                              content: action.payload.comment.content 
                          }],
                      }
                      : post
              ),
              error: null,
          };
      case 'CREATE_POST_FAIL':
      case 'GET_POST_FAIL':
      case 'UPDATE_POST_FAIL':
      case 'DELETE_POST_FAIL':
      case 'LIKE_POST_FAIL':
      case 'ADD_COMMENT_FAIL':
          return {
              ...state,
              error: action.payload,
          };
      default:
          return state;
  }
};

export default postReducer;
