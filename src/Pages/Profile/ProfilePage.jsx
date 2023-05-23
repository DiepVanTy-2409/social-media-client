import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { followUser, getUser } from '../../actions/UserAction'
import { Avatar, Button, ModalUpdateUser, FollowCard, ImageGrid } from '../../Components'
import { Posts } from '../../Containers'
import { Page } from '../index'
import { defaulCoverImage } from '../../assets'
import { createChat } from '../../api/ChatRequest'
import './ProfilePage.css'
const ProfilePage = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const { userData, loading } = useSelector(state => state.userReducer)
    const [tab, setTab] = useState('timeline')
    const [isOpenModal, setOpenModal] = useState(false)
    const [follow, setFollow] = useState(
        localStorage.getItem('store').userReducer
            ? JSON.parse(localStorage.getItem('store')).userReducer.userData.followers.map(user => user._id).includes(user._id)
            : false)
    useEffect(() => {
        dispatch(getUser(userId))
    }, [userId])
    const handleFollow = () => {
        dispatch(followUser(userId, { currentUserId: user._id }))
        setFollow((follow) => !follow)
    }
    const handleClick = (tabName, e) => {
        setTab(tabName)
        document.querySelectorAll('.ProfilePage__nav .Button').forEach((btn) => {
            btn.classList.remove('active')
        })
        e.target.classList.add('active')
    }
    const handleChat = () => {
        createChat({
            senderId: user._id,
            receiverId: userData._id
        })
        navigate(`../chat`)
    }
    if (loading) return <p className="loading_text">Loading...</p>
    const images = userData.timlinePost?.filter(post => post.userId === userData._id && post.image).map(post => post.image)
    return (
        <Page>
            <main className="ProfilePage">
                <div className="ProfilePage__hero">
                    <div className="ProfilePage__image">
                        <img className='ProfilePage__coverPicture' src={!userData?.coverPicture ? defaulCoverImage : (import.meta.env.VITE_PUBLIC_FOLDER + userData.coverPicture)} alt="Cover Picture" />
                        <Avatar src={userData.profilePicture} height='5em' width="5em" />
                        <p className="ProfilePage__userName">{userData.lastName + " " + userData.firstName}</p>
                    </div>
                    <nav className="ProfilePage__nav">
                        <Button className={'active'} handleClick={e => handleClick('timeline', e)}>Dòng thời gian</Button>
                        <Button handleClick={e => handleClick('followers', e)}>Người theo dõi</Button>
                        <Button handleClick={e => handleClick('following', e)}>Đang theo dõi</Button>
                        <Button handleClick={e => handleClick('images', e)}>Hình ảnh</Button>
                        <Button handleClick={e => handleClick('about', e)}>Thông tin</Button>
                        {
                            userId === user._id
                                ? <Button handleClick={() => setOpenModal(true)}><HiOutlinePencilSquare /></Button>
                                : (
                                    <div className='button_group'>
                                        <Button
                                            handleClick={handleFollow}
                                            style={{ background: 'var(--blue)', backgroundImage: 'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)', color: 'var(--white)' }}
                                        >{follow ? 'Bỏ theo dõi' : 'Theo dõi'}
                                        </Button>
                                        <Button className='button button-message' handleClick={handleChat}>Nhắn tin</Button>
                                    </div>
                                )
                        }
                    </nav>
                </div>
                {tab === 'timeline' && <Posts posts={userData.timlinePost} />}
                {tab === 'followers' && <FollowCard data={userData.followers} />}
                {tab === 'following' && <FollowCard data={userData.following} />}
                {tab === 'images' && <ImageGrid images={images} />}
                {tab === 'about' && <div className='profilePage__about'>
                    <p><span className='user_info'>Mô tả:</span> {userData.about || 'chưa được cập nhật'}</p>
                    <p><span className='user_info'>Nới đang ở: </span>{userData.liveIn || 'chưa được cập nhật'}</p>
                    <p><span className='user_info'>Nơi làm việc: </span>{userData.workAt || 'chưa được cập nhật'}</p>
                    <p><span className='user_info'>Mối quan hệ: </span>{userData.relationship || 'chưa được cập nhật'}</p>
                </div>}
                {isOpenModal && <ModalUpdateUser userData={userData} handleClose={() => setOpenModal(false)} />}
            </main>
        </Page >
    )
}

export default ProfilePage



