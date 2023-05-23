import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css'
const Logo = () => {
    return ( 
        <Link className='logo' to ='/' >Alola</Link>
     );
}
 
export default Logo;