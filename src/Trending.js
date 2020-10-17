import React from 'react'
import Sidebar from "./Sidebar"
import "./Trending.css"

import Header from "./Header"

function Trending() {
    return (
        <div className="trending">
            <Sidebar/>
            <div style={{width:"100%"}}>
                <Header/>
                <h1>HERE</h1>
           {/*fetch twitch api stuff here*/}
           </div>
        </div>
    )
}

export default Trending
