import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'

import StarsIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
function PeertoPeer() {
    return (
        <div>
            <h1>Heyy</h1>
            <div className="chatSidebarHeader">
            <Avatar />
              <IconButton>
              
              <StarsIcon/>
              </IconButton>
              
            </div>
           <div className="chatSidebarSearch">
           <div className="chatSidebarSearchConatiner">
           <SearchIcon/>
             <input className="input" placeholder="search" ></input>
           </div>
           

           </div>

           <div className="chatSidebarChats">
             {/* <ChatSidebarChats addNewChat/>
             {
                 people.map(ppl=>(
                     <ChatSidebarChats key={ppl.id} id={ppl.id}
                     name={ppl.data.name}/>
                 ))
             } */}
           </div>

        </div>
    )
}

export default PeertoPeer
