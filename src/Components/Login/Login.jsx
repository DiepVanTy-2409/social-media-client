import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, InputField } from '../'
import './Login.css'
import { logIn } from '../../actions/AuthAction'
const Login = ({ handleChangAction }) => {
    const dispatch = useDispatch()
    const {loading, errorMessage} = useSelector(state => state.authReducer)
    const [err, setErr] = useState("")
    const [dataLogin, setDataLogin] = useState({
        userName: '',
        password: '',
    })
    const handleInput = (e) => {
        e.persist()
        setDataLogin(dataLogin => {
            return {
                ...dataLogin,
                [e.target.name]: e.target.value
            }
        })
    }
    const handlesubmit = async () => {
        dispatch(logIn(dataLogin))
        setErr(errorMessage)
    }
    return (
        <div className='Login'>
            <Form handlesubmit={handlesubmit}>
                <InputField
                    placeholder='User Name'
                    name='userName'
                    handleChange={handleInput}
                    value={dataLogin.userName}
                />
                <InputField
                    type='password'
                    placeholder='Password'
                    name='password'
                    handleChange={handleInput}
                    value={dataLogin.password}
                />
                {
                    err && <p className="errorMessage">{err}</p>
                }
                <Button handleClick={handleChangAction}>I do not have account</Button>
                <Button type='submit'>{loading ? 'loading' : 'Login'}</Button>
            </Form>
        </div>
    )
}

export default Login