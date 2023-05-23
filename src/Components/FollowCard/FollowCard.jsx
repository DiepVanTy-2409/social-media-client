import './FollowCard.css'
import { User } from '../index'
const FollowCard = ({data}) => {
    if (!data) return null
    return (
        <div className='FollowCard'>
            {
                data.map(user => {
                    return (
                        <User
                            key={user._id}
                            avatar={user.profilePicture}
                            name={user.lastName + ' ' + user.firstName}
                            userId={user._id}
                        />
                    )
                })
            }
        </div>
    )
}

export default FollowCard