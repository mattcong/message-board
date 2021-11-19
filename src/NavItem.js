import React from 'react';
import './NavItem.css';


function NavItem({ Icon, text }) {
    return (
        <div className="navbarItem">
            {Icon}
            <h2>{text}</h2>
        </div>
    )
}

export default NavItem