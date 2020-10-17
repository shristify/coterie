import React, { useState, useEffect } from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import "./ChatSidebar.css"
import StarsIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
import ChatSidebarChats from './ChatSidebarChats';
import {db} from "./firebase"
function ChatSidebar() {
    const [people,setPeople]=useState([]);

    useEffect(()=>{
         db.collection("Personal msg").onSnapshot(snapshot=>(
             setPeople(snapshot.docs.map(
                 doc=>({
                     id:doc.id,
                     data:doc.data(),
                 })
             ))
         ))
    })
    return (
        <div className="chatSidebar">
          

            <div className="chatSidebarHeader">
            <Avatar/>
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
             <ChatSidebarChats addNewChat/>
             {
                 people.map(people=>(
                     <ChatSidebarChats key={people.id} id={people.id}
                     name={people.data.name}/>
                 ))
             }
           </div>

        </div>
    )
}

export default ChatSidebar
