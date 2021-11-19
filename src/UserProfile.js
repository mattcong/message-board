import React from 'react'
import './UserPage.css'
import { useAuthContext } from './AuthContext';


function UserProfile() {

    //context data
    const { user } = useAuthContext();

    return (
        <div className="userPage">
            <p>Username: {
                //if user is signed in display details
                user ? user.displayName : "?"}</p>
            <p>Email: {user ? user.email : "?"}</p>
        </div>
    )
}

export default UserProfile
