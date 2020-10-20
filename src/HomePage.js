import React from 'react'
import Sidebar from "./Sidebar"
import "./HomePage.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import VideoPlayer from "./VideoPlayer/VideoPlayer"
function HomePage() {
    return (
        <div className="homePage">
          
           <Header/>
         
              <Sidebar/>
{/*feed*/}
{//{/*profile all the time, upload option here*/}
//{/*top 3*/}
    }
    <div className="timePass">

      <VideoPlayer url=
      "https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2FVanilla%20Custard%20Cake%20_%20Eggless%20_%20Without%20oven.mp4?alt=media&token=2748214d-3117-424e-a8b4-2b577691d164"/>
      
    
        </div></div>
     )
}

export default HomePage
