import React from 'react';
import { MdOutlineLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { Users } from '../';
import { logOut } from '../../actions/AuthAction';
import { Button, TrendsCard } from '../../Components';
import './SidebarRight.css'
const SidebarRight = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOut())
    }
    return (
        <div className="sidebar-right">
            <Button className='Button_logout' handleClick={handleLogout}><MdOutlineLogout />  Đăng xuất</Button>
            <Users heading='Những người bạn có thể biết!' />
            <TrendsCard />
        </div>
    );
}

export default SidebarRight;