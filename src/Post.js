import React, { useState,useEffect } from 'react'
import'./Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './coterie-main/src/firebase';
function Post({ postId,username, caption, imageUrl })
{
    const[comments,setComments]=useState([]);
    const [comment,setComments]=useState('');
    useEffect( ()=>{
        let unsubscribe
        if(postId){
            unsubscribe=db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot)=>{
             setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }  

        return () =>{
            unsubscribe();
        };
    }, [postid]);
     
    const postComment=(event)=>{
        event.preventDefault();
        
        db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username:user.displayName,
        timestamp: firebase.forestore.fieldValue   
        });
        setComment(''); 

    }
    return (
        <div classname="post">
            <div className="post__header"></div>
            <Avatar
            className="post__avatar"
            alt='RafehQazi'
            src=" /*image .jpg*/ "
            />
            
            <h3>{username}</h3>       
                {/*header->avatar+username*/}
            <img className="post__image"src={imageUrl}></img>
            {/*image*/}
            <h4 className="post__text"><strong>{username}</strong>{caption}</h4>
            {/*username+caption*/}
            <div className="post__comments">
                {
                    comments.map((comment) =>(
                        <p>
                            <strong> {comment.username}</strong>{ comment.text}
                        </p>
                    ))
                }
            </div>
            <form>
                <input
                className="post__input"
                type="text"
                placeholder="Add a comment.."
                value={comment}
            onChange={(e) => setComment(e.target.value)}>

                </input>
                <button>
                    disabled={!comment}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                </button>
            </form>

             </div>
    )
}
export default Post
