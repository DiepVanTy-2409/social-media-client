import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom'
import { ChatBox, Conversation, Logo } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import { BsArrowLeft } from 'react-icons/bs'
import socket from '../../socketio/socketio'
import './Chat.css'

const Chat = () => {
    const { user } = useSelector(state => state.authReducer.authData)
    const dispatch = useDispatch()
    // const [chats, setChats] = useState([])
    const [chats, setChats] = useState()
    const [currentChat, setCurrentChat] = useState(JSON.parse(localStorage.getItem('current-chat')) || null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    useEffect(() => {
        socket.emit('new-user-add', user._id)
        socket.on('get-users', (users) => {
            setOnlineUsers(users)
        })
        
    }, [user])

    // RECEIVE MESSAGE FROM SOKET SERVER
    useEffect(() => {
        socket.on('receive-message', (data) => {
            // console.log("RECEIVE DATA: ", data);
            setReceiveMessage(data)
        })
        dispatch({type: 'HAVE_SEEN_MSG'})
        return () => {
            dispatch({type: 'HAVE_SEEN_MSG'})
        }
    }, [])

    useEffect(() => {
        const getChat = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChat()
    }, [user, chats])

    // SEND MESSAGE TO SOCKET SERVER
    useEffect(() => {
        if (sendMessage) {
            socket.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    const handleSetCurrentChat = (chat) => {
        setCurrentChat(chat)
        localStorage.setItem('current-chat', JSON.stringify(chat))
    }

    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.members?.find((member) => member !== user._id)
        const isOnline = onlineUsers.find((user) => user.userId === chatMember)
        return isOnline ? true : false
    }

    if (!chats) return 'loading...'
    if (chats.length === 0) return (
        <div className='flex-center' style={{ textAlign: 'center', lineHeight: '2', minHeight: '100vh', flexDirection: 'column' }}>
            <Logo />
            <p >Không có cuộc trò chuyện để hiển thị.<br />Hãy thêm với một vài người vào danh sách bạn để có thể trò chuyện cùng nhau!</p>
            <Link style={{ color: 'var(--blue)', textDecoration: 'underline' }} to='..'>Về trang chủ!</Link>
        </div>
    )
    return (
        <div className='chatPage'>
            <div className="chatPage__left">
                <div className="chatPage__left__top">
                    <Link className='button__goback' to='..' ><BsArrowLeft /></Link>
                    <Logo />
                </div>
                <div className="chatPage__conversations">
                    {
                        chats.map(chat => {
                            return <div key={chat._id} onClick={() => handleSetCurrentChat(chat)}><Conversation data={chat} currentUserId={user._id} isOnline={checkOnlineStatus(chat)} /></div>
                        })
                    }
                </div>
            </div>
            <div className="chatPage__right flex-center">
                {
                    !currentChat
                        ? <p>Nhấn vào cuộc trò chuyển để bắt đâu!</p>
                        : <ChatBox
                            chat={currentChat}
                            currentUserId={user._id}
                            setSendMessage={setSendMessage}
                            receiveMessage={receiveMessage}
                            isOnline={checkOnlineStatus(currentChat)}
                        />
                }
            </div>
        </div>
    )
}
export default Chat

