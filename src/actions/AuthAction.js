import * as AuthApi from '../api/AuthRequest'

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' })
    try {
        const { data } = await AuthApi.logIn(formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        const err = error.response.data.message
        console.log(err)
        dispatch({ type: 'AUTH_FAIL', data: err })
    }
}

export const logOut = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    localStorage.clear()
}

export const register = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' })
    try {
        const { data } = await AuthApi.register(formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        const err = error.response.data.message
        console.log(err)
        dispatch({ type: 'AUTH_FAIL', data: err })
    }
}