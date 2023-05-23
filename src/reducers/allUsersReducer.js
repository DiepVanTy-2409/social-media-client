const allUsersReducer = (state = {
    users: [],
    loading: true,
    error: false
}, action) => {
    switch (action.type) {
        case 'GET_ALL_USER_START':
            return { ...state, loading: true, error: false };
        case 'GET_ALL_USER_SUCCESS':
            return { ...state, users: [...action.data], loading: false, error: false };
        case 'GET_ALL_USER_FAIL':
            return { ...state, loading: false, error: true };

        default:
            return state
    }
}
export default allUsersReducer