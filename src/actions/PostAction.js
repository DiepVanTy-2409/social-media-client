import * as PostApi from '../api/PostRequest'
export const getTimeLinePosts = (id) => async (dispatch) => {
    dispatch({ type: 'RETREIVING_START' })
    try {
        const { data } = await PostApi.getTimeLinePosts(id)
        dispatch({ type: 'RETREIVING_SUCCESS', data })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'RETREIVING_FAIL' })
    }
}

export const likePost = (id, userId) => async (dispatch) => {
    try {
        await PostApi.likePost(id, userId)
    } catch (error) {
        console.log(error);
    }
}
