const messageReducer = (state = {
    count: 0
}, action) => {
    switch (action.type) {
        case 'HAVE_NEW_MSG':
            return { ...state, count: state.count + 1 }
        case 'HAVE_SEEN_MSG':
            return { ...state, count: 0 }
        default:
            return state;
    }
}
export default messageReducer;