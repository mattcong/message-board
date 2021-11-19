import React, { useState, useRef } from 'react';
import { useAuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import './Forms.css';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';


function SignupPage() {

    //context data
    const { registerUser, signInWithGoogle, loading, error } = useAuthContext();

    //form state
    const [usernameInputText, setUsernameInputText] = useState("");
    const [emailInputText, setEmailInputText] = useState("");
    const [passwordInputText, setPasswordInputText] = useState("");

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        // if all fields are present call register function
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (username && email && password) registerUser(username, email, password);
        // reset form
        setUsernameInputText("");
        setEmailInputText("");
        setPasswordInputText("");
    };

    return (
        <div className="signupPage">

            {//display error message
                error && <p className="error">{error}</p>}

            <div className="form">

                {//display loading icon
                    loading && <p className="loading"><HourglassEmptyIcon /></p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder="username"
                            type="username"
                            ref={usernameRef}
                            //reset input text to empty string
                            value={usernameInputText}
                            onChange={(e) => setUsernameInputText(e.target.value)}
                        />
                    </div>
                    <div>
                        <input placeholder="email"
                            type="email"
                            ref={emailRef}
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
                        <button type="submit">Create Account</button>
                    </div>
                    <div>
                        <button onClick={signInWithGoogle}>Sign up with Google</button>
                    </div>
                </form>

                <Link to="/"><p>Already have an account?</p></Link>

            </div>

        </div>
    )
}

export default SignupPage
