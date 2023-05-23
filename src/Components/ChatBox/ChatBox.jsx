import React, { useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import { getUser } from '../../api/UserRequest'
import { Avatar, Button } from '../'
import { getMessages } from '../../api/ChatRequest'
import InputEmoji from 'react-input-emoji'
import { IoSend } from 'react-icons/io5'
import { sendMessage } from '../../api/ChatRequest'
import './ChatBox.css'


const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage, isOnline }) => {
    const userId = chat?.members?.find(id => id !== currentUserId)
    const [userData, setUserData] = useState()
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const scroll = useRef()

    const handleSend = async (e) => {
        if (!text) return
        const message = {
            senderId: currentUserId,
            text: text,
            chatId: chat._id
        }
        try {
            const { data } = await sendMessage(message)
            setMessages([...messages, data])
            setText('')
        } catch (error) {
            console.log(error)
        }
        //send message to soket server
        setSendMessage({ ...message, receiverId: userId })
    }
    // thứ tự useEffect() cũng rất quan trọng
    useEffect(() => {
        scroll.current?.scrollIntoView({})
    }, [messages])


    //Received message from soket server
    useEffect(() => {
        if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
            // console.log("Received message:", receiveMessage)
            setMessages([...messages, receiveMessage])
        }
        // console.log("RECEIVE MESSAGE " , receiveMessage)
    }, [receiveMessage])

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat) getUserData()
    }, [userId])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat) fetchMessages()
    }, [chat])

    // scroll to last message


    if (!userData) return null
    return (
        <div className='ChatBox'>
            <div className="chatBox__header Conversation">
                <div className='Conversation__avatar'>
                    {isOnline && <span className='online-dot'></span>}
                    <Avatar src={userData?.profilePicture ? userData.profilePicture : ''} height='3.5em' width='3.5em' />
                </div>
                <div className='Conversation__userInfo'>
                    <p className="Conversation__userName">{userData.lastName + ' ' + userData.firstName}</p>
                    <p className='Conversation__userState' >{isOnline ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div className="chatBox__body">
                {messages.map((message, index) => (
                    <div key={index} ref={scroll} className="chatBox__messageLine">
                        <div className={message.senderId === currentUserId ? "chatBox__message own" : "chatBox__message otherUser"}>
                            <p className='message'> {message.text}</p>
                            <p className='message__timeAgo'> {format(message.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chatBox__textField">
                <InputEmoji
                    value={text}
                    onChange={setText}
                    clearOnEnter={true}
                    placeholder='Nhắn tin'
                    onEnter={() => handleSend()}
                />
                <Button className='sendMessageBuuton' handleClick={handleSend}><IoSend color='dodgerblue' /></Button>
            </div>
        </div>
    )
}

export default ChatBox