const authReducer = (state = {
    authData: null,
    loading: false,
    error: false,
    errorMessage: ''
}, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: false, errorMessage: '' }
        case 'AUTH_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, error: false, errorMessage: '' }
        case 'AUTH_FAIL':
            return { ...state, loading: false, error: true, errorMessage: action?.data }
        case 'LOGOUT':
            return { ...state, authData: null, loading: false, error: false }
        default:
            return state
    }
}
export default authReducer