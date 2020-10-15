import React,{useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
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
      db.collection('Posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc=> doc.data()))
      })
    },[])
    return (
        <div>
            <div className="appPage">
       <Sidebar/>
       <div className="appPageFinal">
     <Upload/>
      
     <VideoPlayer
          className='react-player'
          url='https://bit.ly/340vSNm'
          width='100%'
          height='100%'
        />
{
posts.map(post => (
<Post username={post.username} caption={post.caption} 
imageUrl={post.imageUrl} ></Post>


))
}


</div>
     </div>
        </div>
    )
}

export default Connect
