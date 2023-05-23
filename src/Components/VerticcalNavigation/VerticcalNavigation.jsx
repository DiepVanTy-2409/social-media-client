import { NavLink } from 'react-router-dom';
import { TfiHome } from 'react-icons/tfi';
import { RxAvatar } from 'react-icons/rx';
import { VscBell } from 'react-icons/vsc';
import { TbMessageCircle2 } from 'react-icons/tb';
import { BsPeople, BsHandbag, BsCalendar4Event } from 'react-icons/bs';
import { SlFeed } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import './VerticcalNavigation.css'

const VerticalNavigation = () => {
    const { user } = useSelector(state => state.authReducer.authData)
    const {count} = useSelector(state => state.messageReducer)
    const navLinks = [
        { name: 'Trang chủ', icon: <TfiHome />, url: '/' },
        { name: 'Trang cá nhân', icon: <RxAvatar />, url: `/profile/${user._id}` },
        { name: 'Tin nhắn', icon: <TbMessageCircle2 />, url: '/chat' },
        { name: 'Thông báo', icon: <VscBell />, url: '/notifications' },
        { name: 'Cộng đồng', icon: <BsPeople />, url: '/community' },
        { name: 'Chợ', icon: <BsHandbag />, url: '/marketplace' },
        { name: 'Sự kiện', icon: <BsCalendar4Event />, url: '/alola-event' },
        { name: 'Bản tin', icon: <SlFeed />, url: '/news-feed' },
    ]
    return (
        <div className="VerticalNavigation">
            {
                navLinks.map((link, index) => {
                    if (link.url === '/chat') {
                        return (
                            <div className='VerticalNavigation__chatLink' key={index}>
                                <LinkIcon
                                    url={link.url}
                                    icon={link.icon}
                                    name={link.name}
                                />
                                {
                                    count !== 0 && <span className='VerticalNavigation__MessageCount'>{count}</span>
                                }
                            </div>
                        )
                    }
                    else {
                        return (
                            <LinkIcon
                                key={index}
                                url={link.url}
                                icon={link.icon}
                                name={link.name}
                            />
                        )
                    }
                })
            }
        </div>
    );
}
export default VerticalNavigation;



const LinkIcon = ({ icon, url, name, ref }) => {
    return (
        <div className="LinkIcon">
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={url} >{icon} {name}</NavLink>
        </div>
    )
}
