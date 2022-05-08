import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';
import UserProfile from './UserProfile';
import SigninButton from '../feed/SigninButton';
import { useAuthContext } from '../../context/auth';


function UserPage() {

    const { user } = useAuthContext()

    return (
        <div class="userPage">
            {user ? <UserProfile /> : <Link to="/"><SigninButton /></Link>}
        </div>
    )
}

export default UserPage