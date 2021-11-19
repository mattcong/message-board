import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from './firebase-config';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";

//create context object
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    //functions to handle data changes

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        //listener to detect authenticated user
        const unsub = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) setUser(user);
            else setUser(null);
            setError("");
            setLoading(false);
        });
        return unsub
    }, []);

    //register user with email
    const registerUser = (username, email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: username,
                })
            })
            .then((res) => console.log(res))
            .catch(() => setError("Error: Password should be at least 6 characters."))
            .finally(() => setLoading(false));
    };

    //sign in with email
    const signInWithEmail = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch(() => setError("Error: User not found."))
            .finally(() => setLoading(false));
    };

    //sign in with google 
    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    //sign out user
    const signOutUser = () => {
        signOut(auth)
    };

    //store data in context
    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInWithEmail,
        signInWithGoogle,
        signOutUser,
    };

    // render data changes in context
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

//custom hook to access context
export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;