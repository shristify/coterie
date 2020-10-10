import React, {useState, useEffect} from 'react'
//use vs code extension es7 and then write rfce to automatically implement
import "./Header.css";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import {db, auth} from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core'
import Sidebar from './Sidebar'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
function Header() {
    const classes = useStyles();
    const [posts,setPosts]=useState([])
    const[open, setOpen]=useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const[email, setEmail]=useState('')
    const[username, setUsername]=useState('')
    const[password, setPassword]=useState('')
    const[user, setUser]=useState(null)
    const[openSignin, setOpenSignin]=useState('')
  
    useEffect(()=>{
      const unsubscribe=auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          //user has logged in
        console.log(authUser)
        setUser(authUser)
  
        
        }
        else{
          //user has logged out
          setUser(null);
        }
      })
      return()=>{
        unsubscribe();
        //maan lo agar 10 baaar username change ho raha to agar ye nahi krenge to 10 baar ye backend chalege
        //kafi heavy ho jayega juisse
        //isiliye timely cleanup
      }
    },[user,username])
  useEffect(()=>
  {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  
  const signup=(event)=>{
      
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
    alert('signed in successfully')
    return authUser.user.updateProfile({
      displayName:username
    })

  })
  .catch((error)=>alert(error.message))
  
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const signin=(event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password).then((authUser)=>{
      alert('signed in successfully')
      return authUser.user.updateProfile({
        displayName:username
        
      })
      
    })
    .catch((error)=>alert(error.message))
    
    }
    const handleCloseAgain = () => {
      setOpenSignin(false);
    };
    return (

        <div className ="header"> 
       

     
      {/*<Button onClick={() => setOpen(true)} >SignUp</Button>*/}
      
        <div className="headerLogo"><h1>Corterie</h1></div>
        {/*<img className="headerLogo" src="https://www.coteriefashionevents.com/content/dam/Informa/
         coteriefashion/en/COTERIE_0920_DTE_nodates_header_1880x300.jpg" />*/}

        <div className="headerSearch">
                <input className='headerSearchInput' type='text' />
                <SearchIcon color ="secondary" className="headerSearchIcon" /> 
                {/*logo*/}
        </div>
            <div className="headerOptions">
          
            <div className="headerVideoCallIcon"><VideoCallIcon  color="secondary"/></div>
            <div className="headerNoti"> <NotificationsIcon  color="secondary"/></div>
            <div className="headerSetting"><SettingsIcon  color="secondary"/></div> 
            <div className="headerProfile"><AccountCircleIcon  color="secondary"/></div>
            <div className="signIn">
            
            <Modal
        open={open}
        onClose={handleClose}
      
      >
       <div style={modalStyle} className={classes.paper}>
      <div className="appSignUp">
      <h2>Sign Up</h2>
      <h4>for Coterie</h4>
      <Input placeholder="Username" type="username" 
      value = {username} onChange={(e)=>setUsername(e.target.value)} ></Input>
      <Input placeholder="Email" type="text" 
      value = {email } onChange={(e)=>setEmail(e.target.value)} ></Input>
      <Input placeholder="Password" type="password" 
      value = {password } onChange={(e)=>setPassword(e.target.value)} ></Input>
        <Button onClick={signup} >SignUp</Button></div>
        </div>
      </Modal>

      <Modal
        open={openSignin}
        onClose={handleCloseAgain}
      
      >
       <div style={modalStyle} className={classes.paper}>
      <div className="appSignUp">
      <h2>
        Sign In
      </h2>
      <h4>to your Coterie Account</h4>
      
      <Input placeholder="Email" type="text" 
      value = {email } onChange={(e)=>setEmail(e.target.value)} ></Input>
      <Input placeholder="Password" type="password" 
      value = {password } onChange={(e)=>setPassword(e.target.value)} ></Input>
        <Button onClick={signin} color="secondary">SignIn</Button></div>
        </div>
      </Modal>

      {user ? (<div className="logoutButton"><Button variant="contained"  onClick={() => auth.signOut()} color="secondary" >Logout</Button></div>):
       (<div className="loginContainer">
       <Button  onClick={() => setOpen(true)} variant="contained" color="secondary" >SignUp</Button>
        <Button onClick={() => setOpenSignin(true)} variant="contained"  color="secondary">SignIn</Button></div>)}
            </div>
            </div>
         </div>
         
    );
}

export default Header 