import React from 'react';
import { SearchBar, VerticalNavigation, Logo, Line } from '../../Components';
import './SidebarLeft.css'
const SidebarLeft = () => {
    return (
        <div className="sidebar-left">
            <Logo />
            <SearchBar />
            <VerticalNavigation />
            <Line />
        </div>
    );
}

export default SidebarLeft;