import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Input, Post } from '../';
import { SlCamera } from 'react-icons/sl'
import { IoImageOutline } from 'react-icons/io5'
import { HiOutlinePaperClip } from 'react-icons/hi2'
import { TfiLocationPin } from 'react-icons/tfi'
import { BsEmojiSmile } from 'react-icons/bs'
import './StatusBar.css'
import { uploadImage, uploadPost } from '../../actions/UploadAction';
const StatusBar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const { uploading } = useSelector(state => state.postReducer)
    const imageRef = useRef()
    const [post, setPost] = useState({
        image: null,
        desc: ''
    })
    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let img = e.target.files[0]
            setPost({ ...post, image: img })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: post.desc
        }

        if (post.image) {
            const data = new FormData()
            const fileName = Date.now() + post.image.name
            data.append('name', fileName)
            data.append('file', post.image)
            newPost.image = fileName;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        setPost({
            image: null,
            desc: ''
        })
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className="statusBar">
                <div className="statusBar__avatar__input">
                    <Avatar src={user.profilePicture} />
                    <Input
                        value={post.desc}
                        handleChange={(e) => setPost({ ...post, desc: e.target.value })}
                    />
                </div>
                <div className="statusBar__footer">
                    <div className="statusBar__icons">
                        {/* <SlCamera style={{ color: '#cd84f1' }} /> */}
                        <IoImageOutline style={{ color: '#ff4d4d' }} onClick={() => imageRef.current.click()} />
                        <HiOutlinePaperClip style={{ color: '#ffaf40' }} />
                        <TfiLocationPin style={{ color: '#3ae374' }} />
                        <BsEmojiSmile style={{ color: '#18dcff' }} />
                    </div>
                    <div className='statusBar__pen__post'>
                        {
                            (post.image || post.desc) && <Button  style={{border: '1px solid var(--grey-2)'}} type='submit'>{uploading ? 'Loading': 'Share'}</Button>
                        }
                    </div>
                </div>
                <div className="statusBar__ input_file" style={{ display: 'none' }}>
                    <input type="file" accept="image/*" className='input_image' name='image' ref={imageRef} onChange={handleChangeImage} />
                </div>
            </form>
            {
                post.image
                    ? <Post
                        viewOnly={true}
                        userName={`${user.lastName} ${user.firstName}`}
                        handleHidePost={() => setPost({ ...post, image: null })}
                        image={URL.createObjectURL(post.image)}
                        text={post.desc}
                    />
                    : null
            }
        </React.Fragment>
    );
}
export default StatusBar;