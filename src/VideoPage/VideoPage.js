import React,{useEffect, useState} from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import {db, auth} from "../firebase"
import ReactPlayer from 'react-player'
import VideoCard from "../VideoCard/VideoCard"
import "./VideoPage.css"
import {useParams} from 'react-router-dom'
import Sidebar from '../Sidebar'
import Header from '../Header'
import Grid from '@material-ui/core/Grid'
import {Typography, Button, IconButton, Avatar} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useAuthState } from 'react-firebase-hooks/auth';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function VideoPage() {
  const classes = useStyles();
  const[videoAcctUrl, setVideoAcctUrl]=useState("") //  video uploader pic
   const[videoAcct, setVideoAcct]=useState("")  //video uploader name
   const[videoTitle, setVideoTitle]=useState("") ////video uploader titlt
   const[videoDes, setVideoDes]=useState("")//video description
   const[videoTime, setVideoTime]=useState("")//video upload time
   const[videos, setVideos]=useState([])//for mapping side videos
   const {id}=useParams();
    const [videoName,setVideoName]=useState("")//video url
    const [expanded, setExpanded] = React.useState(false);//expands for des
    const[open, setOpen]=useState(false)// for modal 
    const [modalStyle] = React.useState(getModalStyle);


    const [videoComments, setVideoComments]=useState([])
    
    // for video comments
const [videoComment, setVideoComment]=useState("")
    const {photoURL, displayName}=auth.currentUser
const [user]=useAuthState(auth)


    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    useEffect(()=>
{
  db.collection('VideosUser').orderBy('timestamp').onSnapshot(snapshot => {
    setVideos(snapshot.docs.map(doc=> ({
      id:doc.id,
      data:doc.data()}) ))
  })
},[])

 const handleClose = () => {
    setOpen(false);
  };

useEffect(()=>{
  if(id){
      db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
          setVideoName(snapshot.data().videoUrl)
      ))
      db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
        setVideoAcct(snapshot.data().channel)
    ))
    db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
      setVideoAcctUrl(snapshot.data().channelImage)
  ))
  db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
    setVideoTitle(snapshot.data().title)
))
db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
  setVideoDes(snapshot.data().description)
))
db.collection('VideosUser').doc(id).onSnapshot(snapshot=>(
  setVideoTime(snapshot.data().timestamp)
))
  } 

},[id])

  

useEffect(()=>{
  if(id){
      db.collection('VideosUser').doc(id).collection('comments').orderBy("timestamp", "desc").onSnapshot((snapshot)=>(
          setVideoComments(snapshot.docs.map((doc)=>doc.data()))
      ))
  } 

},[id])

const postComment=(event)=>{
  event.preventDefault();
  
  db.collection("VideosUser").doc(id).collection("comments").add({
  comment: videoComment,
  name:user.displayName,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  photo: photoURL   
  });
  setVideoComment(''); 

}

//     useEffect(()=>{
//       db.collection("VideosUser").onSnapshot(snapshot=>(
//           setVideoUrl(snapshot.docs.map(
//               (doc)=>({
//                   id:doc.id,
//                   data:doc.data(),
//               })
//           ))
//       ))

    
//  },[])


    return (
<div className="out">
  <Header></Header>
      <Sidebar></Sidebar>
        <div className="videopage">
   <div className="videoContents">
     <div className="playOutVideo">
     <div className="player-wrapper">
                     <ReactPlayer
                      className="react-player"
                     url={videoName}
                     width='100%'
          height='100%'
          playing={false}
          loop={true}
          muted={false}
          controls={true}/>
        </div>
        </div>

        <Modal
  open={open}
  onClose={handleClose}
>
 <div style={modalStyle} className={classes.paper}>
<div className="copyLink">
<h2 id="simple-modal-title">Copy Link</h2>
      <p id="simple-modal-description">
      {videoName}
      </p>
 </div>
  </div>
</Modal>


        <Grid container direction="row" alignItems='center' justify-content="space-between"
       style={{padding:16}}>
         
         <Grid item>
    <Typography variant="h5" style={{color:"white"}}>{videoTitle}</Typography>
         </Grid>

         {/* <Grid item>
             <Button
             variant="contained"
             color="secondary">
                Subscribe
             </Button>

         </Grid> */}
         <Grid item>
         
         </Grid>
       </Grid>
       
      <div className="acctInfo">
<Avatar src={videoAcctUrl}></Avatar>
<div className="acctInfoHeader">
       <Typography variant="h6" style={{color:"white"}}>{videoAcct}</Typography> 
       </div>
       <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon onClick={() => setOpen(true)} 
          color="secondary"/>
        </IconButton>
       <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color="secondary" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{color:"white"}}>Description:</Typography>
          <Typography style={{color:"white"}}>{videoDes} </Typography>
          <Typography paragraph style={{color:"white"}}>Uploaded at:</Typography>
          <Typography style={{color:"white"}}>
                 {new Date(videoTime.seconds * 1000).toLocaleDateString("en-US")}
                   

          </Typography>
        </CardContent>
      </Collapse>
       </div>
       <form>
                <input
                className="postInput"
                type="text"
                placeholder="Add a comment.."
                value={videoComment}
            onChange={(e) => setVideoComment(e.target.value)}>

                </input>
                <Button
                    disabled={!videoComment}
                    className="post__button"
                    type="submit"
                    color="secondary"
                    onClick={postComment}
                    variant="contained">
                      Post
                </Button>
            </form>
       <div className="postComments">
                {
                    videoComments.map((comment) =>(
                        <p style={{color:"white"}}>
                           <Avatar src={comment.photo}></Avatar> <strong> {comment.name}</strong>{ comment.comment}
                        </p>
                    ))
                }
            </div>
           
       
       </div>
<div className="videopageSug">

{
videos.map(({id,data}) => (
<VideoCard title={data.title} channel={data.channel} views={data.views}
timestamp={new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}
channelImage={data.channelImage}
image={data.image} 
id={id}
key={id}

></VideoCard>


))
} 
</div>                
        </div></div>
    )
}

export default VideoPage
