import React from 'react'
import "./Post.css"
function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <h3>{username}</h3>
            
            <img className="PostImage" src={imageUrl}></img>
              {/*username+caption */}
    <h4>{username}</h4>
    <h5>{caption}</h5>
        </div>
    )
}

export default Post
