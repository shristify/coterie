import React from 'react'
import ReactPlayer from 'react-player'
import Header from "../Header"
import Sidebar from "../Sidebar"
import {useAuthState} from 'react-firebase-hooks/auth'
import {db,auth } from "../firebase"
import "./LiveVideo.css"
import Messages from "../Messages"
function LiveVideo() {

   
    const [user]=useAuthState(auth)
    
    return (
        <div>

<Header/>
            <Sidebar/>
        <div className="liveOut">
            <div className="playLive">
 <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url="https://578462876426.us-west-2.playback.live-video.net/api/video/v1/us-west-2.556122092385.channel.xzfi0lOVmboy.m3u8"
          width="100%"
          height="100%"
          playing={false}
loop={true}
muted={false}
controls={true}
        />
      </div>
      
      </div>
<Messages/>
      </div>
      </div>  
           
       
    )
}

export default LiveVideo
