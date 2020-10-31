import React from 'react'
import Sidebar from "./Sidebar"
import "./Messages.css"
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Button, Input} from '@material-ui/core'
import {auth} from "./firebase"
import ChatRoom from "./ChatRoom"
import Header from "./Header"
function Messages() {
    const[user]=useAuthState(auth)
    return (
        <div className="message">
            
            <div >
            <div className="messageBody">
            <h1 style={{display:'block', fontFamily:"Amatic SC"}}>Send Messages</h1> 
    { user?(<ChatRoom/>):
    (<Button variant="contained" color="primary">Sign in</Button>)}</div>
        </div>
        </div>
    )
}

export default Messages
