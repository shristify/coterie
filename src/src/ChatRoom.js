import React, { useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {db,auth} from './firebase'
import firebase from "firebase";
import { Button } from '@material-ui/core'
import "./ChatRoom.css"

function ChatRoom() {

    const msgRef=db.collection('Messages') /*creates reference in firebase */
    const query=msgRef.orderBy('AtTime').limit(25)
    const [messages]=useCollectionData(query ,{idField: 'id'})
    const[formInput, setFormInput]=useState('')
    
    const sendMsg=async(e)=>{
       e.preventDefault()
       const {uid}=auth.currentUser
       await msgRef.add({
         text:formInput,
         AtTime:  firebase.firestore.FieldValue.serverTimestamp(),
         uid
       })
       setFormInput('')
    }
    return (
        <div className="chatRoom">
            
          {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
            <form onSubmit={sendMsg}>
                <input value={formInput} onChange={(e)=>setFormInput(e.target.value)} />
                <Button variant="contained" color="primary">Send</Button>
            </form>
        </div>
    )
}

function ChatMessage(props){
 const {text,uid}=props.message

 const compareUser=uid=== auth.currentUser.uid ? ('sent'):('recieved')
 return (
  <div className={'message $ {compareUser}'}>
  
 <p>message <strong>{compareUser}</strong>
  {text}</p></div>
 )
}

export default ChatRoom
