import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/UserAction';
import { User } from '../../Components';
import './Users.css'
const Users = ({heading}) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const { users, loading } = useSelector(state => state.allUsersReducer)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    if (loading) return 'loading...'
    return (
        <div className="Users">
            {heading && <h2>{heading}</h2>}
            {
                users.map(us => {
                    if (us._id !== user._id) {
                        return (
                            <User
                                key={us._id}
                                userId={us._id}
                                name={us.lastName + ' ' + us.firstName}
                                avatar={us.profilePicture}
                            />
                        )
                    }
                })
            }
        </div>
    );
}

export default Users;