import React from 'react';
import './Nav.css';
import { useAuthContext } from '../../context/auth';


function CurrentUser() {

    const { user, loading } = useAuthContext()

    return (
        <div className="currentUser">
            <p>
                {loading ? '...' : <> {user ? user.displayName && user.displayName.substring(0, 1).toUpperCase() : '?'} </>}
            </p>
        </div>
    )
}

export default CurrentUser