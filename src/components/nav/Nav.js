import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import NavLink from './NavLink';
import CurrentUser from './CurrentUserIcon';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useAuthContext } from '../../context/auth';


function Nav() {

    const { user, signOutUser } = useAuthContext()

    return (
        <div className="nav">
            <Link to="/feed"><NavLink Icon={<DynamicFeedIcon />} text="" /></Link>
            <Link to="/profile"><NavLink Icon={<PersonOutlineIcon />} text="" /></Link>
            <div></div>
            <CurrentUser />
            <Link to="/"><button className="signinoutButton" onClick={signOutUser}>
                {user ? 'Sign Out' : 'Sign In'} </button></Link>
        </div>
    )
}

export default Nav