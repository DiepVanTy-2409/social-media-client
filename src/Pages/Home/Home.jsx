import React from 'react'
import { StatusBar } from '../../Components';
import { Posts } from '../../Containers';
import { Page } from '../index';
import { getTimeLinePosts } from '../../actions/PostAction';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const { posts, loading } = useSelector(state => state.postReducer)
    const { user } = useSelector(state => state.authReducer.authData)

    React.useEffect(() => {
            dispatch(getTimeLinePosts(user._id))
    }, [])
    if (loading || !user) return <p className="loading_text">Loading...</p>
    return (
        <Page>
            <div className="homePage">
                <StatusBar />
                <main>
                    <Posts posts={posts} />
                </main>
            </div>
        </Page>
    );
}

export default HomePage;