import React,{useState, useEffect} from 'react';
import Header from './Header'
import Upload from './Upload'
import Upload2 from "./Upload2"
import Sidebar from './Sidebar'
import Post from './Post'
import './App.css';
import {db,auth} from './firebase'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Messages from "./Messages"
import Trending from "./Trending"
import {Button, Input} from '@material-ui/core'
import {useAuthState} from 'react-firebase-hooks/auth'
import ReactPlayer from 'react-player'
import VideoPlayer from 'react-video-js-player'
import Connect from "./Connect"
import HomePage from "./HomePage"

function App() {
  const [posts,setPosts]=useState([])
  const[user]=useAuthState(auth)

  useEffect(()=>
  {
    db.collection('Posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  

  return (
    <Router>
    <div className="App">
   {/* <h1>Aao croterie banaye aur avishkar jeetein</h1>
    //going to add sticky header here*/}
    <Header/>
  
    <Switch>

    <Route path ="/messages">
       <Messages/>
     </Route>
     <Route path="/trending">
      <Trending/>
    </Route>
    <Route path="/connect">
      <Connect/>
    </Route>
      <Route path="/">
     <HomePage/>
     </Route>

    
     </Switch>
    {/*sidebar */}
 
    {/*suggested videos here*/}
    {/*upload here */}
    


  
    </div>
    </Router>
  );
}

export default App;
