import React,{useState, useEffect} from 'react';
import Header from './Header'
import Upload from './Upload'
import Sidebar from './Sidebar'
import Post from './Post'
import './App.css';
import {db} from './firebase'


function App() {
  const [posts,setPosts]=useState([])
  const[user, setUser]=useState(null)
  useEffect(()=>
  {
    db.collection('Posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  

  return (
    <div className="App">
   {/* <h1>Aao croterie banaye aur avishkar jeetein</h1>
    //going to add sticky header here*/}
    <Header/>
     <div className="appPage">
       <Sidebar/>
     <Upload/>

{
posts.map(post => (
<Post username={post.username} caption={post.caption} 
imageUrl={post.imageUrl} ></Post>

))
}
     </div>
    {/*sidebar */}
 
    {/*suggested videos here*/}
    {/*upload here */}
    


  
    </div>
  );
}

export default App;
