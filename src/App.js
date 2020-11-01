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
import VideoPage from "./VideoPage/VideoPage"
import UploadVideo from './UploadVideo/UploadVideo'
import {useStateValue } from "./StateProvider"

function App() {

  const[{user1}, dispatch]=useStateValue()
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
    {/*<Route  path ="/messages" component={withRouter(Messages)}/>
     <Route  path="/trending" component={withRouter(Trending)}/>
     <Route path="/connect" component={withRouter(Connect)}/>
  */}
     <Route path="/messages">  {user?(<Messages/>):(<Login/>)}</Route>
     <Route path="/trending">  {user?(<Trending/>):(<Login/>)}</Route>
     <Route path="/connect">  {user?(<Connect/>):(<Login/>)}</Route>
    {/* <Route path="/search/:searchKeyword">
      <h1>Search appears here</h1>
    </Route> */}
    <Route path="/video">
      <h1>video appears here</h1>
      <Route path="/video/:id">
      {user?( <VideoPage/>):(<Login/>)}
   
   </Route>
    </Route>
    <Route path="/uploadvideo">
    {user?(<UploadVideo/>):(<Login/>)}
   
    </Route>
    <Route path="/personalChat"> 
    <Sidebar/>
    <div className="outBlock">
            
            <div className="body">
   
     
    <ChatSidebar></ChatSidebar>
   
    <Route path="/personalChat/:roomId">
    {user?(<ChatPersonal/>):(<Login/>)}
   
    </Route>
      
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
