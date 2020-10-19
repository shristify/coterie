import React,{useState, useEffect} from 'react'
import "./ChatPersonal.css"
import { Avatar,IconButton, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {useParams} from 'react-router-dom'
import { db } from './firebase';
function ChatPersonal() {
    const [input,setInput]=useState("")
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState(""
    )

    useEffect(()=>{
        if(roomId){
            db.collection('Personal msg').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name
                )
            ))
        } 
    },[roomId])
    const sendMsg=(e)=>{
   e.preventDefault()
   console.log("you typed --- ",input)
   setInput("")
    }
    return (
        <div className="personalChat">
       
          <div className="chatHeader">
           <Avatar/>
           <div className="chatHeaderInfo">
    <h3>{roomName}</h3>
               <p>online</p>
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
            <div className="chatMsg">{/**add condition here  */}
                <p>
                <span className="chatName">Prajjwal</span>
                hello
                <span className='timestamp'>20:33</span>
                </p>
               
            </div>
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
