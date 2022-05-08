import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            setLoading(true)
            if (user) setUser(user)
            else setUser(null)
            setError("")
            setLoading(false)
        })
        return unsub
    }, [])

    const registerUser = (username, email, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: username,
                })
            })
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signInWithEmail = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signInWithGoogle = () => {
        setLoading(true)
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    const signOutUser = () => {
        signOut(auth)
    }

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInWithEmail,
        signInWithGoogle,
        signOutUser,
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider