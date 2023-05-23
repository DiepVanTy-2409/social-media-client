import React from 'react';
import './Button.css'
const Button = ({ children, style, handleClick, type = 'button', className}) => {
    const classButton =  `Button ${className}`
    return (
        <button type={type} className={classButton} style={style} onClick={handleClick} >
            {children}
        </button>
    );
}

export default Button;

