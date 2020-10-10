import React, {useState, useEffect}  from 'react';
import Header from './Header'
import './App.css';
import {db, auth} from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core'

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

function App() {

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
    <div className="App">
   {/* <h1>Aao coterie banaye aur avishkar jeetein</h1>
    //going to add sticky header here*/}
    <Header/>
     
    {/*sidebar here*/}
    {/*suggested videos here*/}
    
    <Modal
        open={open}
        onClose={handleClose}
      
      >
       <div style={modalStyle} className={classes.paper}>
      <div className="appSignUp">
      <h2>hello world</h2>
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
      <h2>hello world</h2>
      
      <Input placeholder="Email" type="text" 
      value = {email } onChange={(e)=>setEmail(e.target.value)} ></Input>
      <Input placeholder="Password" type="password" 
      value = {password } onChange={(e)=>setPassword(e.target.value)} ></Input>
        <Button onClick={signin} >SignIn</Button></div>
        </div>
      </Modal>

      {user ? ( <Button onClick={() => auth.signOut()} >Logout</Button>):
       (<div className="loginContainer">
       <Button onClick={() => setOpen(true)} >SignUp</Button>
        <Button onClick={() => setOpenSignin(true)} >SignIn</Button></div>)}
      {/*<Button onClick={() => setOpen(true)} >SignUp</Button>*/}
      <h1>hello</h1>
    </div>
  );
}

export default App;
