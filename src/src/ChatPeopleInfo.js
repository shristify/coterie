import React from 'react'
import './ChatPeopleInfo.css'
import ChatSidebar from './ChatSidebar'
import ChatPersonal from './ChatPersonal'
import Login from "./Login";
import HomePage from "./HomePage";
import {useAuthState} from 'react-firebase-hooks/auth';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {db,auth} from './firebase'
function ChatPeopleInfo() {
    const[user]=useAuthState(auth)
    return (
        <div className="outBlock">
            
            <div className="body">
                
                <Router>
                   <Switch>  
                {/**Sidebar*/}
               
                <ChatSidebar/>
                
                {/**chat*/}
                <ChatPersonal/>
               
                </Switch>  
                </Router>
            </div>
        </div>
    )
}

export default ChatPeopleInfo
