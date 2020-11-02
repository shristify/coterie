import React,{useState} from 'react'
import {Button, Input,LinearProgress, Grid} from '@material-ui/core'
import {db, auth,storage} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import "./UploadVideo.css"
import firebase from "firebase"
import Sidebar from '../Sidebar'
import Header from '../Header'
import "../index.css"
function UploadVideo() {

   
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [progress, setProgress]=useState(0)
    const [video, setVideo]=useState(null)
    const [thumbnail, setThumbnail]=useState('')
    const [user]=useAuthState(auth)
    
   
    const handleChange=(e)=>{
        if(e.target.files[0]){
           setVideo(e.target.files[0])
        }
    }
    

    const handleUpload=()=>{
        const uploadVideo = storage.ref(`video/${video.name}`).put(video);
        {/*const uploadThumbnail = storage.ref(`video/${thumbnail.name}`).put(thumbnail);*/}
        const{displayName, photoURL}=auth.currentUser
        uploadVideo.on(
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
              .ref("video")
              .child(video.name)
              .getDownloadURL()
              .then(url => {
                console.log(url);
                db.collection("VideosUser").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    title:title,
                    videoUrl:url,
                    channelImage:photoURL,
                    description:description,
                    channel:user.displayName,
                    image:thumbnail,

                
                })
               
               
               alert("video uploaded successfully")
                setProgress(0)
                setVideo(null)
                setTitle("")
                setDescription("")
                setThumbnail("")
              });
          }
        );
      };
    
    return (
        <div className="uploadContainer">
         <Sidebar/>
         <div className="uploadSection">
        <h1 className="headTitle">Share Your Videos</h1>
        {/*ab login krne k baad, we have to input description
  upload video and post button */}

{ user?(<div className="uploadVideo">

<LinearProgress variant="determinate" color="secondary" value={progress}/><hr></hr>
<Grid>
    <Grid item><h3>Upload Video</h3>
<input type="file" onChange={handleChange}></input></Grid><hr></hr>
<Grid item>
    <h3>Thumbnail</h3>
<input type="link" placeholder="enter link of thumbnail"
 onChange={event => setThumbnail(event.target.value)}
value={thumbnail}></input></Grid><hr></hr>
<Grid item><input type="text" className="title" placeholder="enter Title"
  onChange={event => setTitle(event.target.value)} value={title}></input></Grid>
  <hr></hr>
 <Grid item><input type="text" className="description" 
  onChange={event => setDescription(event.target.value)} value={description}></input></Grid></Grid>
<hr></hr>
  <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
      Upload
    </Button>
</div> ):(<Button 

variant="contained" color="primary">Sign in</Button>)}

    </div></div>
    )
}

export default UploadVideo
