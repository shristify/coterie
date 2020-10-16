import React, {useState, useEffect} from 'react'
//use vs code extension es7 and then write rfce to automatically implement
import {db, auth} from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core'
//import Sidebar from './Sidebar'
import {Link} from "react-router-dom";
import firebase from "firebase"
import Sidebar from "./Sidebar"
import "./HomePage.css"
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
  
function Login() {
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
      alert('Account created successfully!')
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
        alert('Welcome back!')
        return authUser.user.updateProfile({
          displayName:username
          
        })
        
      })
      .catch((error)=>alert(error.message))
      }
  
      const signinwithgoogle=()=>{
        const provider=new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then((authUser)=>{
          alert('Signed in successfully')
          return authUser.user.updateProfile({
            displayName:username
            
          })
          
        })
        .catch((error)=>alert(error.message))
      }
  
      const signinwithfacebook=()=>{
        const provider=new firebase.auth.FacebookAuthProvider()
        auth.signInWithPopup(provider).then((authUser)=>{
          alert('Welcome back!')
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

        <div className="login">
           <h1>I WAS HERE</h1>
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
        <Button onClick={signin} variant="contained" color="secondary">SignIn</Button></div>
        <br></br>
        <Button className="Google"
        onClick={signinwithgoogle} variant="contained" color="primary">Sign in with Google</Button>
        <hr></hr>
        <Button className="Google"
        onClick={signinwithfacebook} variant="contained" color="primary">Sign in with facebook</Button>
        </div>
      </Modal>
 {user ? (<div className="logoutButton"><Button variant="contained"  onClick={() => auth.signOut()} color="secondary" >Logout</Button></div>):
    (<div className="loginContainer">
   <Button  onClick={() => setOpen(true)} variant="contained" color="secondary" >SignUp</Button>
    <Button onClick={() => setOpenSignin(true)} variant="contained"  color="secondary">SignIn</Button></div>)}
            </div>
            </div>
          );
}


export default Login
