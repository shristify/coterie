import React,{useState, useEffect} from 'react'
import "./ChatPersonal.css"
import { Avatar,IconButton, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {useParams} from 'react-router-dom'
import { db,auth } from './firebase';
import firebase from "firebase";
function ChatPersonal() {
    const [input,setInput]=useState("")
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState("")
    const [messaging, setMessaging]=useState([])
   
    const {uid,photoURL, displayName}=auth.currentUser

     useEffect(()=>{
         if(roomId){
             db.collection('Personal msg').doc(roomId).onSnapshot(snapshot=>(
                 setRoomName(snapshot.data().name)
                 
             ))
             
             db.collection('Personal msg').doc(roomId).collection('chats').orderBy("timestamp",
             'asc').onSnapshot(
                (snapshot)=>(
                     setMessaging(snapshot.docs.map(doc=>
                     doc.data())
                )
       
               ))

         } 

    

        


     },[roomId])
    const sendMsg=(e)=>{
   e.preventDefault()
   console.log("you typed --- ",input)

   db.collection('Personal msg').doc(roomId).collection('chats').add({
    name:displayName,
    message:input,
    timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
    userid:uid,
    pic:photoURL
  
   })

   setInput("")
    }
    return (
        <div className="personalChat">
       
          <div className="chatHeader">
           <Avatar/>
           <div className="chatHeaderInfo">
    <h3>{roomName}</h3>
               <p>last seen at
                   {
                       new Date(messaging[messaging.length-1]?.timestamp?.toDate()).toUTCString() 
                   }
               </p>
           </div>
          <div className="chatHeaderRight">
             <IconButton>
             <FileCopyIcon/>
             
                 

             </IconButton>

             <IconButton><SearchIcon/>
                 </IconButton>
             <IconButton><MoreVertIcon/></IconButton>
          </div>

          </div>
          <div className="chatBody">
              {
                  messaging.map((chatting)=>(
                
                   <p className={`chatMsg ${true &&
                 "chatReciever"}`}>
                  <span className="chatName">{chatting.name}</span>
                   {chatting.message}
                   <span className='timestamp'>{
                    new Date(chatting.timestamp?.toDate()).toUTCString()
                    }</span>
                </p>
               
          
    ))
              }
            
          </div>
          <div className="chatFooter">
           <EmojiEmotionsIcon/>
           <form>
               <input value={input} onChange={(e)=>setInput
            (e.target.value)} placeholder="enter message"></input>
               <Button color="primary" variant="contained" onClick={sendMsg} 
               type="submit">Send</Button>
           </form>
          </div>
        </div>
    )
}

export default ChatPersonal
