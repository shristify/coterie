import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
export default function Sidebar() {
    return (
        <div className="sidebar">
              
              <div className="sidebarOptions">
             
             <IconButton color="secondary" aria-label="Home">
        <HomeIcon fontSize="large"/>
      </IconButton>
      <IconButton className="chat" color="secondary" aria-label="Chat">
        <ChatIcon fontSize="large"/>
      </IconButton>
      <IconButton className="trending" color="secondary" aria-label="trending">
        <WhatshotIcon fontSize="large" />
      </IconButton>
             
          
          </div>
        </div>
    )
}

