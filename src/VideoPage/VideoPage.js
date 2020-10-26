import React,{useEffect, useState} from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import {db} from "../firebase"
function VideoPage() {

    const [videoUrl,setVideoUrl]=useState([])
   
  
    useEffect(()=>
    {
      db.collection('VideosUser').onSnapshot(snapshot => {
        setVideoUrl(snapshot.docs.map((doc)=> doc.data()))
      })
    },[])
    return (
        <div>
            <h1>jai hind</h1>
            <VideoPlayer url={"https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/video%2Fy2mate.com%20-%20%23Maggi%20in%20Time%20Lapse_1080p.mp4?alt=media&token=37488e39-a9d3-46e5-a758-bc59d2b26a84"}></VideoPlayer>
           
        </div>
    )
}

export default VideoPage
