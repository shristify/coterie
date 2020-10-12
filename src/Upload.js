import React,{useState} from 'react'
import {Button, Input} from '@material-ui/core'
import {db, auth,storage} from "./firebase";
import firebase from "firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
function Upload({username}) {
    const [caption, setCaption]=useState('')
    const [progress, setProgress]=useState(0)
    const [image, setImage]=useState(null)

    const handleChange=(e)=>{
        if(e.target.files[0]){
           setImage(e.target.files[0])
        }
    }

    const handleUpload=()=>{
       const uploadTask= firebase.storage().ref('upload/${image.name}').put(image)
      
       
       uploadTask.on("stateChanged",
       (snapshot)=>{
           //progress bar here
           const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
         setProgress(progress)
        },
        (error)=>{
            console.log(error)
            alert("an error occured while uploading.. try again")
        },
        ()=>{
            storage.ref("upload").child(image.name).getDownloadURL()
            .then(url=>{
                //push upload into database
                db.colloection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption:caption,
                    imageUrl:url,
                    username:username
                  
                    
                })
                setProgress(0);
                    setImage(null);
                    setCaption("")
            })
        }
        )
    }
    return (
        <div>
            <h1>hey</h1>
            {/*ab login krne k baad, we have to input description
      upload video and post button */}
      <progress value={progress} max='100' />
      <input type="text" placeholder="enter caption"
      onChange={event => setCaption(event.target.value)} value={caption}></input>
      <input type="file" onChange={handleChange}></input>
      <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
          Upload
        </Button>
        </div>
    )
}

export default Upload
