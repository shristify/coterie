import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
export default function Sidebar() {
    return (
        <div className="sidebar">
              
              <div className="sidebarOptions">
             <Link to="/">
             <IconButton color="secondary" aria-label="Home">
        <HomeIcon fontSize="large"/>
      </IconButton></Link>
      <Link to="/messages">
      <IconButton className="chat" color="secondary" aria-label="Chat">
        <ChatIcon fontSize="large"/>
      </IconButton></Link>
      <Link to="/trending">
      <IconButton className="trending" color="secondary" aria-label="trending">
        <WhatshotIcon fontSize="large" />
      </IconButton></Link>
      <Link to="/connect">
      <IconButton className="connect" color="secondary" aria-label="trending">
        <PeopleIcon fontSize="large" />
      </IconButton></Link>
             
          
          </div>
        </div>
    )
}

