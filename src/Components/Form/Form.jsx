import React, { useRef } from 'react'
import './Form.css'
import { IoImageOutline } from 'react-icons/io5'


const Form = ({ handlesubmit, children }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handlesubmit();
    }
    return (
        <form onSubmit={onSubmit} className="Form">
            {children}
        </form>
    )
}



const InputField = ({ type = 'text', value, handleChange, placeholder, name, children }) => {
    const inputRef = useRef()
    return (
        <div className="InputField">
            {
                type === 'file' &&
                <button type='button' onClick={() => inputRef.current.click()}><IoImageOutline style={{ color: 'green' }} />{children}</button>
            }
            <input
                ref={inputRef}
                style={{ display: type !== 'file' ? 'inline' : 'none' }}
                type={type}
                placeholder={placeholder}
                // onChange={(e) => handleChange(e.target.value)}
                onChange={handleChange}
                value={value}
                name={name}
            />
        </div>
    )
}

export {
    Form, InputField,
}