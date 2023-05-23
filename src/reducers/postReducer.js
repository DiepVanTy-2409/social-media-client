const postReducer = (state = {
    posts: [],
    loading: false,
    uploading: false,
    error: false
}, action) => {
    switch (action.type) {
        case 'UPLOAD_START':
            return { ...state, uploading: true, error: false }
        case 'UPLOAD_SUCCESS':
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false }
        case 'UPLOAD_FAIL':
            return { ...state, uploading: false, error: true }
        case 'RETREIVING_START':
            return { ...state, loading: true, uploading: false, error: false }
        case 'RETREIVING_SUCCESS':
            return { ...state, posts: [...action.data], loading: false, uploading: false, error: false }
        case 'RETREIVING_FAIL':
            return { ...state, loading: false, uploading: false, error: true }

        /**
        case 'GET_COMMENTS_START':
            return { ...state, loading: false, uploading: false, error: false }
        case 'GET_COMMENTS_SUCCESS':
            state.posts = state.posts.map(post => {
                if (post._id === action.postId) {
                    post.comment = action.data
                    return post
                }
                return post
            })
            return { ...state, loading: false, uploading: false, error: false }
        case 'GET_COMMENTS_FAIL':
            return { ...state, loading: false, uploading: false, error: true }
            */
        default:
            return state
    }
}

export default postReducer