import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { Avatar } from '../'
import './Conversation.css'
const Conversation = ({ data, currentUserId, isOnline }) => {
    const userId = data?.members?.find(id => id !== currentUserId)
    const [userData, setUseData] = useState({
        lastName: '',
        firstName: '',
    })
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUseData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])
    return (
        <div className='Conversation'>
            <div className='Conversation__avatar'>
                {isOnline && <span className='online-dot'></span>}
                <Avatar src={userData?.profilePicture ? userData.profilePicture : ''} height='3.5em' width='3.5em' />
            </div>
            <div className='Conversation__userInfo'>
                <p className="Conversation__userName">{userData.lastName + ' ' + userData.firstName}</p>
                <p className='Conversation__userState' >{isOnline ? "Online" : 'Offline'}</p>
            </div>
        </div>
    )
}

export default Conversation