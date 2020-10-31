 import React, { useState, useEffect } from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import "./ChatSidebar.css"
import StarsIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
import ChatSidebarChats from './ChatSidebarChats';
import {db,auth} from "./firebase"
import {useStateValue } from "./StateProvider"


function ChatSidebar() {
    const [people,setPeople]=useState([]);
    const[{user1}, dispatch]=useStateValue()
    const {uid,photoURL, displayName}=auth.currentUser
    
    useEffect(()=>{
         const unsubscribe=db.collection("Personal msg").onSnapshot(snapshot=>(
             setPeople(snapshot.docs.map(
                 (doc)=>({
                     id:doc.id,
                     data:doc.data(),
                 })
             ))
         ))

         return ()=>{
             unsubscribe();
         }
    },[])


    return (
        <div className="chatSidebar">
          

            <div className="chatSidebarHeader">
            <Avatar src={photoURL}/>
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
                 people.map(ppl=>(
                     <ChatSidebarChats key={ppl.id} id={ppl.id}
                     name={ppl.data.name}/>
                 ))
             }
           </div>

        </div>
    )
}

export default ChatSidebar
