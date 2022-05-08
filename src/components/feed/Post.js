import React from 'react';
import './Post.css';


function Post({
    username,
    text,
    image,
    timestamp
}) {
    return (
        <div className="post">
            <div className="post__header">
                <div className="post__header--username">
                    <h1>{username}</h1>
                </div>
            </div>
            <div className="post__body">
                <div className="post__body--text">
                    <p>{text}</p>
                </div>
                <div className="post__body--image">
                    <img src={image} alt=""></img>
                </div>
            </div>
            <div className="post__footer"><div className="post__footer--timestamp">
                <p>{timestamp}</p>
            </div></div>
        </div>
    )
}

export default Post