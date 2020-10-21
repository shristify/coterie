import React, { useState,useEffect } from 'react'
import'./Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db, auth } from './firebase';
import firebase from "firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
function Post({ postId,username, caption, imageUrl })
{

    const [comment,setComments]=useState([]);
    const[user]=useAuthState(auth)
    useEffect( ()=>{
        
        if(postId){
           db.collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot)=>{
             setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }  

        return () =>{
            
        };
    }, [postId]);
     
    const postComment=(event)=>{
        event.preventDefault();
        
        db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username:user.displayName,
        timestamp: firebase.forestore.fieldValue   
        });
        setComments(''); 

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
                    comment.map((comment) =>(
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
            onChange={(e) => setComments(e.target.value)}>

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
