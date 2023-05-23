import React, { useState } from 'react'
import { Form, InputField, Button } from '../'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/AuthAction'
const Register = ({ handleChangeAction }) => {
    const dispatch = useDispatch()
    const { loading, errorMessage } = useSelector(state => state.authReducer)
    const [errorPassword, setErrorPassword] = useState(false)
    const [err, setErr] = useState("")
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        comfirmPassword: '',
    })
    const handleInput = (e) => {
        e.persist();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = () => {
        if (data.password === data.comfirmPassword) {
            const { firstName, lastName, userName, password } = data;
            dispatch(register({ firstName, lastName, userName, password }))
            setErr(errorMessage)
        } else {
            setErrorPassword(true)
        }
    }
    return (
        <div className='Register'>
            <Form handlesubmit={handlesubmit}>
                <InputField
                    placeholder='First Name'
                    name="firstName"
                    handleChange={handleInput}
                    value={data.firstName}
                />
                <InputField
                    placeholder='Last Name'
                    name='lastName'
                    handleChange={handleInput}
                    value={data.lastName}
                />
                <InputField
                    placeholder='User Name'
                    name='userName'
                    handleChange={handleInput}
                    value={data.userName}
                />
                <InputField
                    type='password'
                    placeholder='Password'
                    name='password'
                    handleChange={handleInput}
                    value={data.password}
                />
                <InputField
                    type='password'
                    placeholder='Comfirm Password'
                    name='comfirmPassword'
                    handleChange={handleInput}
                    value={data.comfirmPassword}
                />
                {
                    data.comfirmPassword && errorPassword
                        ? <span className='Register__checkPassword'>Confirm password is not same</span>
                        : null

                }
                {
                    err && <p className="errorMessage">{err}</p>
                }
                <Button handleClick={handleChangeAction}>I already have an account</Button>
                <Button type='submit'>{loading ? 'loading' : 'Register'}</Button>
            </Form>
        </div>
    )
}

export default Register