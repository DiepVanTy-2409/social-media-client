import React from 'react';
import './Input.css'
const Input = ({value, handleChange, autoFocus = false}) => {
    return (
        <div className="input">
            <input 
            type="text" 
            placeholder="Bạn đang nghĩ gì?"
            value={value} 
            onChange={handleChange}
            autoFocus={autoFocus}
            />
        </div>
    );
}

export default Input;