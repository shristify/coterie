import React,{useEffect, useState} from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import {db} from "../firebase"
import ReactPlayer from 'react-player'
import VideoCard from "../VideoCard/VideoCard"
import "./VideoPage.css"
import Sidebar from '../Sidebar'
function VideoPage() {

    const [videoUrl,setVideoUrl]=useState([])
   const[videos, setVideos]=useState([])

    useEffect(()=>
{
  db.collection('VideosUser').orderBy('timestamp').onSnapshot(snapshot => {
    setVideos(snapshot.docs.map(doc=> ({
      id:doc.id,
      data:doc.data()}) ))
  })
},[])
  
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
      <Sidebar></Sidebar>
        <div className="videopage">
           
            {/* <ReactPlayer
          className='react-player'
          url={video.id}
          width='500px'
          height='400px'
          playing={false}
          loop={true}
          muted={false}
          controls={true}
    /> */}


          
                     <ReactPlayer 
                    
                     url="https://rb.gy/7cmpvj"
                     width='800px'
          height='400px'
          playing={false}
          loop={true}
          muted={false}
          controls={true}/>

<div className="videopageSug">

{
videos.map(({id,data}) => (
<VideoCard title={data.title} channel={data.channel} views={data.views}
timestamp={new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}
channelImage={data.channelImage}
image={data.image} 
id={id}

></VideoCard>


))
}
</div>                
        </div></div>
    )
}

export default VideoPage
