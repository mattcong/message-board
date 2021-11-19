import React from 'react';
import './Nav.css';
import NavItem from './NavItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import CurrentUser from './CurrentUser'


function Nav() {

    const { user, signOutUser } = useAuthContext();

    return (
        <div className="nav">
            <Link to="/feed"><NavItem Icon={<DynamicFeedIcon />} text="" /></Link>
            <Link to="/profile"><NavItem Icon={<PersonOutlineIcon />} text="" /></Link>
            <div></div>
            <CurrentUser />
            <Link to="/"><button className="signinoutButton" onClick={signOutUser}>
                {//change button label based on authentication status
                    user ? 'Sign Out' : 'Sign In'} </button></Link>
        </div>
    )
}

export default Nav