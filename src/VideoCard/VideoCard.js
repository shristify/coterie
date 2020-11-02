import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import {Link } from 'react-router-dom'
import "./VideoCard.css"
function VideoCard({image, title, channel, views, timestamp,channelImage,id,key}) {
  return (
    <Link to={`/video/${id}`}>
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
    </div></Link>
  )
}

export default VideoCard
