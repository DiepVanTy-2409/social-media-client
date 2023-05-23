import * as UserApi from '../api/UserRequest'

export const getUser = (userId) => async (dispatch) => {
    dispatch({ type: 'GET_USER_START' })
    try {
        const { data } = await UserApi.getUser(userId)
        dispatch({ type: 'GET_USER_SUCCESS', data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'GET_USER_FAIL' })
    }
}


export const updateUser = (data, userId) => async (dispatch) => {
    dispatch({ type: 'UPDATE_USER_START' })
    try {
        const newInfo = await UserApi.updateUser(data, userId)
        dispatch({ type: 'UPDATE_USER_SUCCESS', data: newInfo.data })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'UPDATE_USER_FAIL' })
    }
}

export const followUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: 'FOLLOW_USER_START' })
    try {
        await UserApi.followUser(userId, userData)
        dispatch({ type: 'FOLLOW_USER_SUCCESS', data: userData.currentUserId })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'FOLLOW_USER_FAIL' })
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_ALL_USER_START' })
    try {
        const { data } = await UserApi.getAllUsers()
        dispatch({ type: 'GET_ALL_USER_SUCCESS', data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'GET_ALL_USER_FAIL' })
    }
}