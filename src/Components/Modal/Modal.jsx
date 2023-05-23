import React from 'react'
import './Modal.css'
const Modal = ({children}) => {
  return (
    <div className='modal'>
        <div className="modal__content">
            {children}
        </div>
    </div>
  )
}

export default Modal