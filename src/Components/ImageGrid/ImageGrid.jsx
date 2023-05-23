import { useState } from 'react'
import { Modal } from '../'
import './ImageGrid.css'
const ImageGrid = ({ images = [] }) => {
    return (
        <>
            <div className='ImageGrid'>
                {images.map((image, index) => <img
                    key={index}
                    src={import.meta.env.VITE_PUBLIC_FOLDER + image}
                    alt='Error'
                />)}
            </div>
        </>
    )
}

export default ImageGrid