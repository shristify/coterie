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
import {Button, Input, Avatar} from '@material-ui/core'
import Fuse from 'fuse.js'
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import firebase from "firebase"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SearchPage from "./SearchPage"
import VideoCard from "./VideoCard/VideoCard"
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
      width: '100%',
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
    const [searchfunc,setSearchfunc]=useState("")
    const {uid,photoURL, displayName}=auth.currentUser


    const [videos, setVideos]=useState([])


    useEffect(()=>
    {
      db.collection('VideosUser').orderBy('timestamp').onSnapshot(snapshot => {
        setVideos(snapshot.docs.map(doc=> ({
          id:doc.id,
          data:doc.data()}) ))
      })
    },[])
    

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

    useEffect(() => {
      const fuse =new Fuse(
        videos,
        {
          keys:
          ['data.description', 'data.title']
        }
      )
      const results = fuse.search(searchfunc).map(({ item }) => item);

      if (searchfunc.length > 3 && results.length > 0) {
        setVideos(results);
      }

    }, [searchfunc])

    const handleCloseAgain = () => {
      setOpenSignin(false);
    };
    return (
      <div>
        <div className ="header" > 
      {/*<Button onClick={() => setOpen(true)} >SignUp</Button>*/}
        <div className="headerLogo"><h1 style={{fontFamily:'Amatic SC',color:"white"}}>Coterie</h1></div>
        {/*<img className="headerLogo" src="https://www.coteriefashionevents.com/content/dam/Informa/
         coteriefashion/en/COTERIE_0920_DTE_nodates_header_1880x300.jpg" />*/}

<div className="headerSearch" >
                <input value={searchfunc}
                onChange={e=>setSearchfunc(e.target.value)}
                placeholder="search" className='headerSearchInput' type='text' />
                <Link to={`/search/${searchfunc}`}>
                  <IconButton color="secondary" aria-label="Home"> <SearchIcon color ="secondary" className="headerSearchIcon" /> 
                </IconButton>
               </Link>
                {/*logo*/}
        </div>

       
<div className="headerOptions"> 
<Link to="/UploadVideo">
<div className="headerVideoCallIcon"><IconButton color="secondary" aria-label="Home"><VideoCallIcon  color="secondary"/></IconButton></div>
</Link>
<div  className="headerNoti"> <IconButton color="secondary" aria-label="Home"><NotificationsIcon  color="secondary"/></IconButton></div>
<div  className="headerSetting"><IconButton color="secondary" aria-label="Home"><SettingsIcon  color="secondary"/></IconButton></div> 
<div className="headerProfile">
  
  <IconButton color="secondary" aria-label="Home">
  <Avatar src ={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} style={{width
:"30px", height:"30px"}}
/>
    </IconButton></div>

    
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
 {user ? (<div className="logoutButton" ><Button variant="contained"  onClick={() => auth.signOut()} color="secondary" >
   Logout</Button></div>):
    (<div className="loginContainer">
   <Button  onClick={() => setOpen(true)} ></Button>
    <Button onClick={() => setOpenSignin(true)} ></Button>
          </div>)}  </div>
          </div>
          </div>
          </div>
          
         
    );

}


export default Header



