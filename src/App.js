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
import {useAuthState} from 'react-firebase-hooks/auth';
import ReactPlayer from 'react-player'
import VideoPlayer from 'react-video-js-player'
import Connect from "./Connect";
import Login from "./Login";
import HomePage from "./HomePage";
import "./index.css"
import ChatPeopleInfo from './ChatPeopleInfo';
import ChatSidebar from './ChatSidebar'
import ChatPersonal from './ChatPersonal'
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
      
    <Route path="/connect" component={withRouter(Connect)}/>
    <Route exact path="/personalChat"> <Sidebar/>
    <div className="outBlock">
            
            <div className="body">
   
     
    <ChatSidebar></ChatSidebar>
     <Route path="/personalChat/rooms/roomId">
      <ChatPersonal></ChatPersonal></Route>
      
      </div>
      </div></Route>
     {/*<Route exact path="/" component={withRouter(HomePage)}/>*/}  
  <Route path="/">  {user?(<HomePage/>):(<Login/>)}</Route>  
     </Switch>
  
    </div>
    </Router>
  );
}

export default App;
