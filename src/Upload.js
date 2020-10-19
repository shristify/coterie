import React,{useState} from 'react'
import {Button, Input} from '@material-ui/core'
import {db, auth,storage} from "./firebase";
import firebase from "firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import LinearProgress from '@material-ui/core/LinearProgress';
function Upload({username}) {
    const [caption, setCaption]=useState('')
    const [progress, setProgress]=useState(0)
    const [image, setImage]=useState(null)
    const [user]=useAuthState(auth)
    
    
    const handleChange=(e)=>{
        if(e.target.files[0]){
           setImage(e.target.files[0])
        }
    }

    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        const{displayName, photoURL}=auth.currentUser
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                console.log(url);
                db.collection("Posts").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    caption:caption,
                    imageUrl:url,
                    username:displayName

                
                })

                setProgress(0)
                setImage(0)
                setCaption("")
              });
          }
        );
      };
    
    return (
        <div className="container">
            <h1>Share Your feelings</h1>
            {/*ab login krne k baad, we have to input description
      upload video and post button */}

{ user?(<div className="uploadTask">

<LinearProgress variant="determinate" color="secondary" value={progress}/>
      <input type="text" placeholder="enter caption"
      onChange={event => setCaption(event.target.value)} value={caption}></input>
      <input type="file" onChange={handleChange}></input>
      <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
          Upload
        </Button>
</div> ):(<Button 
    
    variant="contained" color="primary">Sign in</Button>)}

        </div>
    )
}

export default Upload
