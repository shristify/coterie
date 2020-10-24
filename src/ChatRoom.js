import React, { useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {db,auth} from './firebase'
import firebase from "firebase";
import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import "./ChatRoom.css"

function ChatRoom() {

    const msgRef=db.collection('Messages') /*creates reference in firebase */
    const query=msgRef.orderBy('AtTime')
    const [messages]=useCollectionData(query ,{idField: 'id'})
    const[formInput, setFormInput]=useState('')
    
    const sendMsg=async(e)=>{
       e.preventDefault()
       const {uid,photoURL, displayName}=auth.currentUser
       if(formInput!=null){
       await msgRef.add({
         text:formInput,
         AtTime:  firebase.firestore.FieldValue.serverTimestamp(),
         uid,
         photoURL,
         displayName
       })
       setFormInput('')
    }}
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
 const {text,uid,photoURL,displayName}=props.message

 const compareUser=uid=== auth.currentUser.uid ? ('sent'):('recieved')
 return (
  <div className={'message $ {compareUser}'}>
  <Avatar src ={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} style={{width
:"40px"}}/>
 <p>{displayName}
  {text}</p></div>
 )
}

export default ChatRoom
