const userReducer = (state = {
    userData: null,
    loading: true,
    error: false,
    uploading: false,
}, action) => {
    switch (action.type) {
        case 'GET_USER_START':
            return { ...state, loading: true, error: false }
        case 'GET_USER_SUCCESS':
            return { ...state, userData: { ...action.data }, loading: false, error: false }
        case 'GET_USER_FAIL':
            return { ...state, loading: false, error: true }
        case 'UPDATE_USER_START':
            return { ...state, uploading: true, error: false }
        case 'UPDATE_USER_SUCCESS':
            window.localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, userData: { ...action.data }, uploading: false, error: false }
        case 'UPDATE_USER_FAIL':
            return { ...state, uploading: false, error: false }
        case 'FOLLOW_USER_START':
            return { ...state, uploading: true, error: false }
        case 'FOLLOW_USER_SUCCESS':
            if (!state.userData.followers.includes(action.data)) {
                // follow user
                state.userData.followers.push(action.data)
            } else {
                // unfollow user
                state.userData.followers = state.userData.followers.filter(item => item !== action.data)
            }
            return { ...state, uploading: false, error: false }
        case 'FOLLOW_USER_FAIL':
            return { ...state, uploading: false, error: true }
        default:
            return state
    }
}
export default userReducer
