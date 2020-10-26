import React from 'react'
import {Avatar} from '@material-ui/core'
import {db} from "./firebase"
import {Link} from 'react-router-dom'
function ChatSidebarChats({id, name,addNewChat}) {

    const createChat=()=>{
       const chatroom=prompt("enter name of chat")

       if(chatroom){
           db.collection("Personal msg").add({
               name:chatroom
           })
       }
    }
    return !addNewChat ?(
        <Link to={`/personalChat/${id}`}>
        <div className="sidebarChats">
            <Avatar src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"/>
            <div className="sidebarChatsInfo">
              
              <h2>{name}</h2>
                <p>last msg</p>
            </div>
           
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChats">
            <h2>add new chat</h2>
        </div>
    )
}

export default ChatSidebarChats
