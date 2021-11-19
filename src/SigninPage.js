import React, { useState, useRef } from 'react';
import { useAuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import './Forms.css';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';


function SigninPage() {

    //context data
    const { signInWithEmail, signInWithGoogle, loading, error } = useAuthContext();

    //form state
    const [emailInputText, setEmailInputText] = useState("");
    const [passwordInputText, setPasswordInputText] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email && password) signInWithEmail(email, password);
        setEmailInputText("");
        setPasswordInputText("");
    };

    return (
        <div className="signinPage">

            {//display error message
                error && <p className="error">{error}</p>}

            <div className="form">

                {//display loading icon
                    loading && <p className="loading"><HourglassEmptyIcon /></p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder="email"
                            type="email"
                            ref={emailRef}
                            //reset input text to empty string
                            value={emailInputText}
                            onChange={(e) => setEmailInputText(e.target.value)}
                        />
                    </div>
                    <div>
                        <input placeholder="password"
                            type="password"
                            ref={passwordRef}
                            value={passwordInputText}
                            onChange={(e) => setPasswordInputText(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                    <div>
                        <button onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                </form>

                <Link to="/signup"><p>New User?</p></Link>

            </div>

        </div>
    )
}

export default SigninPage