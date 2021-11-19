import React from 'react';
import UserProfile from './UserProfile';
import './UserPage.css'
import SigninButton from './SigninButton';
import { useAuthContext } from './AuthContext';
import { Link } from 'react-router-dom';


function UserPage() {
    
    //context data
    const { user } = useAuthContext();

    return (
        <div class="userPage">
            {user ?
                //if user is signed in show profile page, otherwise show sign in button
                <UserProfile /> : <Link to="/"><SigninButton /></Link>}
        </div>
    )
}

export default UserPage
