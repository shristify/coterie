import React, { useState,useEffect } from 'react'
import'./Post.css';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Avatar from "@material-ui/core/Avatar";
import { db, auth } from './firebase';
import firebase from "firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
function Post({ postId, username, caption, imageUrl,avatar })
{
    const [comments, setComments] = useState([])

    const [comment, setComment] = useState('')
    const[user]=useAuthState(auth)
const {photoURL} =auth.currentUser


    useEffect( ()=>{
      let unsubscribe;
         if (postId) {
unsubscribe=
            db.collection("Posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            })
        }


        return () =>{
          unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("Posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()   ,
            avatar:photoURL
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                src=""
                ></Avatar>

            <h3>{username}</h3>

            </div>

            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className='post__text'><strong>{username} </strong>{caption} </h4>
            <div className="post__comments" style={{color:"white"}}>
                {comments.map((comment) => (
                    <p>
                      <Avatar
                src={comment.avatar}
                ></Avatar> <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            <form className="post__commentBox">
                <input 
                    type="text"
                    className="post__input"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
                >
                Post</button>
            </form>
            
        </div>
    ) 
}

export default Post
