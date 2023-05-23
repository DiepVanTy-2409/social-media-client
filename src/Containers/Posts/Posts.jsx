import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '../../Components';
import './Posts.css'

const Posts = ({ posts = [] }) => {
    const { userId } = useParams()
    const { users } = useSelector(state => state.allUsersReducer)
    return (
        <div className="posts">
            {
                userId
                    ? posts.filter(post => post.userId === userId).map((post) => {
                        const authPost = users.find(persion => persion._id == post.userId)
                        return (
                            <Post
                                key={post._id}
                                id={post._id}
                                text={post.desc}
                                image={post.image}
                                userName={post.userName}
                                info={post.updatedAt}
                                likes={post.likes}
                                userId={post.userId}
                                comments={post.comment}
                                profilePicture={authPost.profilePicture}
                            />
                        )
                    })
                    : posts.map((post) => {
                        const authPost = users.find(persion => persion._id == post.userId)
                        return (
                            <Post
                                key={post._id}
                                id={post._id}
                                text={post.desc}
                                image={post.image}
                                userName={post.userName}
                                info={post.updatedAt}
                                likes={post.likes}
                                userId={post.userId}
                                comments={post.comment}
                                profilePicture={authPost.profilePicture}
                            />
                        )
                    })
            }
        </div>
    );
}

export default Posts;