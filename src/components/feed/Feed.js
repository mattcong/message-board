import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Feed.css';
import SendIcon from '@mui/icons-material/Send';
import Post from './Post';
import SigninButton from './SigninButton';
import { db } from '../../config/firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    orderBy,
    query
} from 'firebase/firestore';
import { useAuthContext } from '../../context/auth';


function Feed() {

    const { user } = useAuthContext()

    const [newPostText, setNewPostText] = useState("")
    const [newPostImage, setNewPostImage] = useState("")
    const [posts, setPosts] = useState([])

    const dataRef = collection(db, "posts")

    useEffect(() => {
        const q = query(dataRef, orderBy("createdAt", "desc"))

        const unsub = onSnapshot(q, (snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        return unsub
    }, [])

    const addPost = async (e) => {
        e.preventDefault()
        await addDoc(dataRef, {
            username: user.displayName,
            text: newPostText,
            image: newPostImage,
            createdAt: serverTimestamp(),
        })
        setNewPostText("")
        setNewPostImage("")
    }

    return (
        <div className="feed">

            {/* input box */}

            {user ?
                <div className="addPost">
                    <form onSubmit={addPost} >
                        <div className="addPost__inputBox">
                            <textarea className="addPost__inputBox--form"
                                placeholder="Say Something..."
                                type="text"
                                value={newPostText}
                                onChange={(e) => { setNewPostText(e.target.value) }} />
                            <input className="addPost__inputbox--imgURL"
                                placeholder="Enter Image URL"
                                type="text"
                                value={newPostImage}
                                onChange={(e) => { setNewPostImage(e.target.value) }} />
                        </div>
                    </form>
                    <div className="addPost__inputBox--postButton">
                        <button type="submit" disabled={!newPostText} onClick={addPost}><SendIcon /></button>
                    </div>
                </div>
                : <Link to="/"><SigninButton /></Link>}

            {/* posts */}

            {posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        username={post.username}
                        text={post.text}
                        image={post.image}
                        timestamp={post.createdAt && post.createdAt.toDate().toLocaleString()}
                    />
                )
            })}

        </div >
    )
}

export default Feed