import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { User, Button, Comment, Line } from '../';
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { TfiCommentAlt, TfiShare } from 'react-icons/tfi'
import { useSelector } from 'react-redux';
import { getCommentsPost, likePost } from '../../api/PostRequest';
import './Post.css'

const Post = ({ profilePicture, id, userId, userName, image, text, info, viewOnly = false, handleHidePost, likes = [], comments = [] }) => {
    const { user } = useSelector(state => state.authReducer.authData)
    const [isLiked, setLike] = useState(likes.includes(user._id))
    const [likeCount, setLikeCount] = useState(likes.length)
    const [commentCount, setcommentCount] = useState(comments.length)
    const [isOpen, setOpen] = useState(false)
    const [_comments, setComments] = useState([])
    const post = useRef()
    const handleLike = () => {
        setLike(isLiked => !isLiked)
        likePost(id, user._id)
        setLikeCount(likeCount => !isLiked ? likeCount + 1 : likeCount - 1)
    }

    const handleComment = async () => {
        if (!isOpen) {
            try {
                const { data } = await getCommentsPost(id)
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }
        setOpen(!isOpen)
    }

    const hidePost = () => {
        post.current.style.display = 'none'
    }

    return (
        <aside className='post' ref={post}>
            <div className="post__header">
                <User avatar={profilePicture} name={userName} info={info} userId={userId} />
                <Button handleClick={handleHidePost || hidePost}><AiOutlineClose /></Button>
            </div>
            <figure className="post__main">
                <figcaption className="post__text">{text}</figcaption>
                {
                    image &&
                    <div className="post__image">
                        <img
                            src={
                                !viewOnly ?
                                    import.meta.env.VITE_PUBLIC_FOLDER + image :
                                    image
                            }
                            alt='image error'
                        />
                    </div>
                }
            </figure>
            {!viewOnly &&
                <div className="post__footer">
                    {
                        isLiked
                            ? <Button handleClick={handleLike}><span className='flex-center' style={{ color: '#d63031' }}><BsHeartFill /><span className='post__action_text'>Like</span> </span>{likeCount != 0 && <span className='count'>{likeCount}</span>}</Button>
                            : <Button handleClick={handleLike}><span className='flex-center' ><BsHeart /><span className='post__action_text'>Like</span> </span>{likeCount != 0 && <span className='count'>{likeCount}</span>}</Button>
                    }

                    <Button handleClick={handleComment}><TfiCommentAlt /><span className='post__action_text'>Bình luận</span>{commentCount != 0 && <span className='count'>{commentCount}</span>}</Button>
                    <Button><TfiShare /><span className='post__action_text'>Chia sẻ</span></Button>
                </div>}
            {
                isOpen && <><Line /><Comment comments={_comments} postId={id} onSubmit={() => setcommentCount(commentCount => commentCount + 1)} /></>
            }
        </aside>
    );
}

export default Post;