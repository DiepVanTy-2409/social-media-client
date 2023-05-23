import React from 'react';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import './User.css'
import { avatarGirl, avatarBoy } from '../../assets'
const User = ({ avatar = '', name, info, userId }) => {
    return (
        <Link className="User" to={`../profile/${userId}`}>
            <Avatar src={avatar} />
            <div className='User__name_info'>
                <p className='User__name'>{name}</p>
                {
                    info && <p className='User__info'>{format(info)}</p>
                }
            </div>
        </Link>
    );
}

const Avatar = ({ src, height = '2.5em', width = '2.5em' }) => {
    return (
        <div className='Avatar' style={{ width: `${width}`, height: `${height}` }}>
            <img className='Avatar__image' src={!src ? avatarBoy : (import.meta.env.VITE_PUBLIC_FOLDER + src)} alt="Avatar" />
        </div>
    )
}
export {
    User,
    Avatar
} 