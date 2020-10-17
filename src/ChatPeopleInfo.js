import React from 'react'
import './ChatPeopleInfo.css'
import ChatSidebar from './ChatSidebar'
import ChatPersonal from './ChatPersonal'

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function ChatPeopleInfo() {
    return (
        <div className="outBlock">
            
            <div className="body">
                <Router>
                    <Switch> <ChatSidebar/>
                        <Route path="/rooms/:roomId">
                {/**Sidebar*/}
               
                {/**chat*/}
                <ChatPersonal/></Route>
            
                </Switch>
                </Router>
            </div>
        </div>
    )
}

export default ChatPeopleInfo
