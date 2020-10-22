import React from 'react'
import Sidebar from "./Sidebar"
import "./HomePage.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
function HomePage() {
    return (
        <div className="homePage"> 
           <Header/>
              <Sidebar/>
{/*feed*/}
{//{/*profile all the time, upload option here*/}
//{/*top 3*/}
    }
   </div>
     )
}

export default HomePage
