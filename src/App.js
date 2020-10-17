import React,{useState, useEffect} from 'react';
import Header from './Header'
import Upload from './Upload'
import Upload2 from "./Upload2"
import Sidebar from './Sidebar'
import { withRouter } from 'react-router-dom'

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
import Login from "./Login"
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
    <div className="App" >  
  
      <Switch>
    <Route  path ="/messages" component={withRouter(Messages)}/>
     <Route  path="/trending" component={withRouter(Trending)}/>
      
    <Route exact path="/connect" component={withRouter(Connect)}/>
     
      <Route exact path="/" component={withRouter(HomePage)}/>  
      {user?(<HomePage/>):(<Login/>)}
     </Switch>
  
    </div>
    </Router>
  );
}

export default App;
