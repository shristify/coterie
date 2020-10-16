import React from 'react'
import Sidebar from "./Sidebar"
import "./Trending.css"
function Trending() {
    return (
        <div className="trending">
            <Sidebar/>
           {/*fetch twitch api stuff here*/}
        </div>
    )
}

export default Trending
