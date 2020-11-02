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
import LiveVideo from "./LiveVideo/LiveVideo"
import Fuse  from "fuse.js"
import PeertoPeer from './Ptop/PeertoPeer';
import {loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Payment from "./Payment"
import VideoCard from "./VideoCard/VideoCard"
const promise = loadStripe(
  "pk_test_51HhcNeHdCMWk0EMNO6e6u9aYEFt8Wcb6R19nrSyXLDmn9BFxMsT0iNtUzBE3weGbMceM0E2epln0rtgESQ6ZXxk500crXRkcex"
)
function App() {

  const[{user1}, dispatch]=useStateValue()
  const [posts,setPosts]=useState([])
  const[user]=useAuthState(auth)
  const [videos, setVideos]=useState([])


  useEffect(()=>
  {
    db.collection('VideosUser').orderBy('timestamp').onSnapshot(snapshot => {
      setVideos(snapshot.docs.map(doc=> ({
        id:doc.id,
        data:doc.data()}) ))
    })
  },[])


  useEffect(()=>
  {
    db.collection('Posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  

  // useEffect(() => {
  //   const fuse =new Fuse(
  //     videos,{
  //       keys:['data.description', 'data.title']
  //     }
  //   )
    
  //   const searchResults=fuse.search(searchfunc).map(({item})=>item)
  //   }, [searchfunc])


  return (
    <Router>
    <div className="App" >  
  
      <Switch>
    <Route  path ="/messages" component={withRouter(Messages)}/>
     <Route  path="/trending" component={withRouter(Trending)}/>
      
    <Route path="/connect" component={withRouter(Connect)}/>
    
    <Route path="/video">
      <h1>video appears here</h1>
      <Route path="/video/:id">
    <VideoPage></VideoPage></Route>
    </Route>
    <Route path="/uploadvideo">
      <UploadVideo/>
    </Route>
    <Route path="/personalChat"> <Sidebar/>
    <div className="outBlock">
            
            <div className="body">
   
     
    <ChatSidebar></ChatSidebar>
   
    <Route path="/personalChat/:roomId">

    <ChatPersonal></ChatPersonal>
    </Route>
      
      </div>
      </div></Route> 
<Route path="/liveVideo">
  
<LiveVideo></LiveVideo>
</Route>
      <Route path="/payment">
        <Elements stripe={promise}>
          <Payment></Payment>
        </Elements>
      </Route>
      <Route path="/p2pchat">
        <PeertoPeer></PeertoPeer>
      </Route>
      <Route path="/search/:searchKeyword">
        
        {
videos.map(({id,data}) => (
<VideoCard title={data.title} channel={data.channel} views={data.views}
timestamp={new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}
channelImage={data.channelImage}
image={data.image} 
id={id}
key={id}

></VideoCard>


))
} 
    </Route> 
     {/*<Route exact path="/" component={withRouter(HomePage)}/>*/}  
  <Route path="/">  {user?(<HomePage/>):(<Login/>)}</Route>  
     </Switch>
  
    </div>
    </Router>
  );
}

export default App;
