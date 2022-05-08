import React from 'react';
import './UserPage.css';
import { useAuthContext } from '../../context/auth';


function UserProfile() {

    const { user } = useAuthContext()

    return (
        <div className="userPage">
            <p>Username: {user ? user.displayName : "?"}</p>
            <p>Email: {user ? user.email : "?"}</p>
        </div>
    )
}

export default UserProfile