import React,{useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {db,auth} from './firebase'
import firebase from "firebase";
import { Button } from '@material-ui/core'
import "./ChatRoom.css"

function Upload2() {

    const msgRef=db.collection('Posts') /*creates reference in firebase */
    const query=msgRef.orderBy('AtTime')
    const [messages]=useCollectionData(query ,{idField: 'id'})
    const[formInput, setFormInput]=useState('')
    
    const sendMsg=async(e)=>{
       e.preventDefault()
       const {uid, photoURL}=auth.currentUser
       await msgRef.add({
         text:formInput,
         AtTime:  firebase.firestore.FieldValue.serverTimestamp(),
         uid,
         photoURL
       })
       setFormInput('')
    }


    return (
        <div>
             {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
            <form onSubmit={sendMsg}>
                <input value={formInput} onChange={(e)=>setFormInput(e.target.value)} />
                <Button variant="contained" color="primary">Send</Button>
            </form>
        </div>
    )
}
function ChatMessage(props){
    const {text,uid, photoURL}=props.message
   
    const compareUser=uid=== auth.currentUser.uid ? ('sent'):('recieved')
    return (
     <div className={'message $ {compareUser}'}>
     <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
    <p>message <strong>{compareUser}</strong>
     {text}</p></div>
    )
   }
   
export default Upload2
