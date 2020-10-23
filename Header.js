import React from 'react'
//use vs code extension es7 and then write rfce to automatically implement
import "./Header.css";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideoCallIcon from '@material-ui/icons/VideoCall';
function Header() {
  
    return (
        <div className ="header"> 
       <div className="headerMenu">
        <MenuOpenIcon  color="secondary"/></div>
        <div className="headerLogo"><h1>Coterie</h1></div>
        {/*<img className="headerLogo" src="https://www.coteriefashionevents.com/content/dam/Informa/
         coteriefashion/en/COTERIE_0920_DTE_nodates_header_1880x300.jpg" />*/}

        <div className="headerSearch">
                <input className='headerSearchInput' type='text' />
                <SearchIcon color ="secondary" className="headerSearchIcon" /> 
                {/*logo*/}
        </div>
            <div className="headerOptions">
          
            <div className="headerVideoCallIcon"><VideoCallIcon  color="secondary"/></div>
            <div className="headerNoti"> <NotificationsIcon  color="secondary"/></div>
            <div className="headerSetting"><SettingsIcon  color="secondary"/></div> 
            <div className="headerProfile"><AccountCircleIcon  color="secondary"/></div>
            </div>
         </div>
         
    );
}

export default Header 