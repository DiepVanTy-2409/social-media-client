import React, { useState } from 'react';
import { Avatar, Input, User } from '../';
import { commentPost } from '../../api/PostRequest';
import { useSelector } from 'react-redux';
import './Comment.css'
const Comment = ({ comments = [], postId, onSubmit }) => {
    const { user } = useSelector(state => state.authReducer.authData)
    const [text, setText] = useState('')
    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: user._id,
            comment: text,
        }
        commentPost(postId, data)
        comments.push({
            ...data,
            _id: Date.now(),
            profilePicture: user.profilePicture,
            lastName: user.lastName,
            firstName: user.firstName,
            createdAt: new Date()
        })
        setText('')
        onSubmit()
    }
    return (
        <div className="comment">
            <div className="comment__yourComment">
                <Avatar src={user.profilePicture} />
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Input autoFocus={true} value={text} handleChange={handleChange} />
                </form>
            </div>
            <div className='comment__message'>
                {
                    Array.prototype.reverse.call(
                        comments.map((comment) => {
                            return (
                                <div key={comment._id} className='comment_user_text'>
                                    <User
                                        avatar={comment.profilePicture}
                                        userId={comment.userId}
                                        name={comment.lastName + ' ' + comment.firstName}
                                        info={comment.createdAt}
                                    />
                                    <div className="comment__text">  {comment.comment} </div>
                                </div >
                            )
                        }))
                }
            </div>
        </div>
    );
}

export default Comment;