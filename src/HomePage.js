import React from 'react'
import Sidebar from "./Sidebar"
import "./HomePage.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from "./Header"
function HomePage() {
    return (
        <div className="homePage">
          <div class="columns">
          <div class="column is-12">
           <Header/>
           </div>
              <div class="column is-1"> 
              <Sidebar/>
              </div>
            
           </div>
   
{/*feed*/}
{//{/*profile all the time, upload option here*/}
//{/*top 3*/}
    }
        </div>
     )
}

export default HomePage
