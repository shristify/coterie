import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import SendIcon from '@material-ui/icons/Send';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
export default function Sidebar() {
    return (
        <div className="sidebar">
        <div className="sidebarOptions">
             <Link to="/">
             <IconButton color="secondary" aria-label="Home">
        <HomeIcon fontSize="medium"/>
      </IconButton></Link>
      {/* <Link to="/messages">
      <IconButton className="chat" color="secondary" aria-label="Chat">
        <ChatIcon fontSize="medium"/>
      </IconButton></Link> */}
      <Link to="/personalChat">
      <IconButton className="chat" color="secondary" aria-label="Chat">
        <SendIcon fontSize="medium"/>
      </IconButton></Link>
      <Link to="/trending">
      <IconButton className="trending" color="secondary" aria-label="trending">
        <WhatshotIcon fontSize="medium" />
      </IconButton></Link>
      <Link to="/connect">
      <IconButton className="connect" color="secondary" aria-label="trending">
        <PeopleIcon fontSize="medium" />
      </IconButton></Link>
      <Link to="/liveVideo">
      <IconButton className="live" color="secondary" aria-label="live">
        <SettingsInputAntennaIcon fontSize="medium" />
      </IconButton></Link>

        </div>
        </div>
    )
}

