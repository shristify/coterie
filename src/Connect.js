import React,{useState, useEffect} from 'react'

import VideoPlayer from 'react-video-js-player'
import Header from './Header'
import Upload from './Upload'
import Upload2 from "./Upload2"
import Sidebar from './Sidebar'
import Post from './Post'
import {db,auth} from './firebase'
function Connect() {
    const [posts,setPosts]=useState([])
   
  
    useEffect(()=>
    {
      db.collection('Posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map( (doc)=>({
          id:doc.id,
          data:doc.data(),
      })
        ))})
      
    },[])
    return (
        <div>
            <div className="appPage">
       <Sidebar/>
       <Header/>
       <div className="appPageFinal">
     <Upload/>
      
  


{
posts.map(post => (
<Post username={post.data.username} caption={post.data.caption} 
imageUrl={post.data.imageUrl} postId={post.id} avatar={post.data.avatar}></Post>


))
}


</div>
     </div>
        </div>
    )
}

export default Connect
