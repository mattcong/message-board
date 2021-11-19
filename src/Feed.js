import React, { useState, useEffect } from 'react';
import './Feed.css';
import SendIcon from '@mui/icons-material/Send';
import Post from './Post';
import { db } from './firebase-config';
import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    orderBy,
    query
} from 'firebase/firestore';
import { useAuthContext } from './AuthContext';
import SigninButton from './SigninButton';
import { Link } from 'react-router-dom';


function Feed() {

    //context data
    const { user } = useAuthContext();

    //form state
    const [newPostText, setNewPostText] = useState("");
    const [newPostImage, setNewPostImage] = useState("");
    //posts data state
    const [posts, setPosts] = useState([]);

    //collection (posts) reference variable 
    const dataRef = collection(db, "posts");

    //fetch docs (post data) from firestore
    useEffect(() => {
        //order posts collection by timestamp
        const q = query(dataRef, orderBy("createdAt", "desc"));
        //render posts
        const unsub = onSnapshot(q, (snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, []);

    //add new post to collection
    const addPost = async (e) => {
        // stop default refresh on submit
        e.preventDefault();
        //add post state to db
        await addDoc(dataRef, {
            username: user.displayName,
            text: newPostText,
            image: newPostImage,
            createdAt: serverTimestamp(),
        });
        //reset form to empty state
        setNewPostText("");
        setNewPostImage("");
    };

    return (
        <div className="feed">


            {/* input box */}

            {user ?
                //if user is signed in show input box
                <div className="addPost">
                    <form onSubmit={addPost} >
                        <div className="addPost__inputBox">
                            <textarea className="addPost__inputBox--form"
                                placeholder="Say Something..."
                                type="text"
                                // update new post text state with input content
                                value={newPostText}
                                onChange={(e) => { setNewPostText(e.target.value) }} />
                            <input className="addPost__inputbox--imgURL"
                                placeholder="Enter Image URL"
                                type="text"
                                // update new post image state with input content
                                value={newPostImage}
                                onChange={(e) => { setNewPostImage(e.target.value) }} />
                        </div>
                    </form>
                    <div className="addPost__inputBox--postButton">
                        <button type="submit" disabled={!newPostText} onClick={addPost}><SendIcon /></button>
                    </div>
                </div>
                //if user is not signed in show sign in button 
                : <Link to="/"><SigninButton /></Link>}


            {/* posts */}

            {posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        username={post.username}
                        text={post.text}
                        image={post.image}
                        timestamp={post.createdAt
                            //wait for timestamp data then call toDate method
                            && post.createdAt.toDate().toLocaleString()}
                    />
                )
            })}
        </div >
    )
}

export default Feed