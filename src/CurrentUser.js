import React from 'react'
import { useAuthContext } from './AuthContext';
import './Nav.css';


function CurrentUser() {

    //context data
    const { user, loading } = useAuthContext();

    return (
        <div className="currentUser">
            <p>
                {loading ? '...' : <>
                    { //if user is signed in display username
                        user ? user.displayName
                            //wait for username data then show as initial 
                            && user.displayName.substring(0, 1).toUpperCase() : '?'} </>}</p>
        </div>
    )
}

export default CurrentUser
