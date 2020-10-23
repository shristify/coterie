import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import "./VideoCard.css"
function VideoCard({image, title, channel, views, timestamp,channelImage}) {
  return (
    <div className="cardVideo">
      <img className="thumbnailCard"
      src={image} alt={title} ></img>
      <div className="videocardInfo">
        <Avatar className="videoAvatar" alt={channel} src={channelImage}></Avatar>

        <div className="videocardText">
          <h6 style={{color:"white"}}>{title}</h6>
  <p style={{marginBottom:"0px"}}>{channel}</p>
  <p style={{marginTop:"0px"}}>{views} - {timestamp} </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
