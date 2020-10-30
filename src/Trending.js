import Sidebar from "./Sidebar"
import "./Trending.css"
import React,{Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Games from "./components/Games";
import Stream from "./components/Streams";
import GameStreams from "./components/GameStreams";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom'
import Messages from "./Messages"
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import "shards-ui/dist/css/shards.min.css";
import Header from "./Header"
import Header1 from "./components/Header1";
import './App.css';

function Trending() {
    return (       
<div className="Trending">

<Sidebar/>
<Header/>
      <Router>
        
    <Header1 className="navbar" />
    <Switch>
<Route exact path="/trending/top-streams" component={withRouter(Stream)} />
      <Route path="/trending/game/:id" component={withRouter(GameStreams)} />
      <Route exact path="/trending" component={withRouter(Games)} />
      </Switch>    
        </Router>
     
      </div>
           
        
    )
}

export default Trending
