import React from 'react';
import './NavLink.css';


function NavLink({ Icon, text }) {
    return (
        <div className="navbarItem">
            {Icon}
            <h2>{text}</h2>
        </div>
    )
}

export default NavLink