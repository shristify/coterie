import React from 'react'
import Sidebar from "./Sidebar"
import "./Messages.css"
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Button, Input} from '@material-ui/core'
import {auth} from "./firebase"
import ChatRoom from "./ChatRoom"

function Messages() {
    const[user]=useAuthState(auth)

    
    return (
        <div className="message">
            <Sidebar/>
            
            <div className="messageBody">
            <h1>Send Messages</h1> 
    { user?(<ChatRoom/>):(<Button 
    
    variant="contained" color="primary">Sign in</Button>)}</div>
        </div>
    )
}

export default Messages
