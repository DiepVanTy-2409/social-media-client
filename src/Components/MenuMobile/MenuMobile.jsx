import { NavLink } from 'react-router-dom';
import { TfiHome } from 'react-icons/tfi';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineLogout } from 'react-icons/md';
import { TbMessageCircle2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/AuthAction';
import './MenuMobile.css'
import { SearchBar, Button } from '../';
const MenuMobile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer.authData)
    const { count } = useSelector(state => state.messageReducer)
    const navLinks = [
        { name: 'Trang chủ', icon: <TfiHome />, url: '/' },
        { name: 'Trang cá nhân', icon: <RxAvatar />, url: `/profile/${user._id}` },
        { name: 'Tin nhắn', icon: <TbMessageCircle2 />, url: '/chat' },
    ]
    return (
        <div className='MenuMobile'>
            <SearchBar />
            {
                navLinks.map((link, index) => (
                    link.url === '/chat'
                        ? <NavLink to={link.url} key={index}>{link.icon}
                            {
                                count !== 0 && <span className='MenuMobile_msgCount'>{count}</span>
                            }
                        </NavLink>
                        : <NavLink to={link.url} key={index}>{link.icon}</NavLink>
                    // <NavLink to={link.url} key={index}>{link.icon}</NavLink>
                ))
            }
            <Button handleClick={() => dispatch(logOut())}><MdOutlineLogout /></Button>
        </div>
    )
}

export default MenuMobile