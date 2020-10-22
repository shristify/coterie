import React from 'react'
import Sidebar from "./Sidebar"
import "./HomePage.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import VideoPlayer from "./VideoPlayer/VideoPlayer"
import VideoCard from "./VideoCard/VideoCard"
import Carousel from "react-bootstrap/Carousel"; 



function HomePage() {

    return (
        <div className="homePage">
          
           <Header/>
         
              <Sidebar/>
{/*feed*/}
<div className="homeBlock">
<h2 style={{color:"white"}}>Featured</h2>

<div className='imgSlide'>
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://wallpapercave.com/wp/wp1854239.jpg"
      alt="First slide"
    style={{height:"400px"}}
    />
    <Carousel.Caption>
      <h3 style={{color:"white"}}>Rocket League</h3>
      <p>Can you play football while flying?</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://bit.ly/3m5mz4K"
      alt="Third slide"
      style={{height:"400px", width:"50%"}}
    />

    <Carousel.Caption>
      <h3 style={{color:"white"}}>Call of Duty</h3>
      <p>Kill and win</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://bit.ly/3dM2oGh"
      alt="Third slide"
      style={{height:"400px"}}
    />

    <Carousel.Caption>
      <h3 style={{color:"white"}}>GTA V</h3>
      <p>Jai Shree Ram ! Mandir Wahi Banega</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<br></br><br></br>

      </div>
      <h2 style={{color:"white"}}>Suggested Videos</h2>
      <br></br>
      <div className="cardVideo">
      
  

      <VideoCard url="https://cdn-www.bluestacks.com/bs-images/AU_BeginnersGuide_S8.jpg" 
title="Wahh bhaiya full among us baaji" channel="prajjwal._" views="10"  date="21 October 2020"  avatar="P"/>
<VideoCard url="https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2FDesert.jpg?alt=media&token=8202165c-9d81-4095-b6bf-b5ac8d2b5a60" 
title="Best Maggie in timelapse" channel="Kabhi Khana Tum Meri Gali" views="11k"  date="21 October 2020"  avatar="K" />
<VideoCard url="https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2Fdownload.jpg?alt=media&token=f7016a04-3e71-4dec-a24a-6db9597b5b2b" 
title="why would life take us on like that huh" channel="Vineeta" views="1k"  date="21 October 2020"  avatar="V"/>


</div>
<hr></hr>
<hr></hr>
<div className="other">
<VideoCard url="https://cdn-www.bluestacks.com/bs-images/AU_BeginnersGuide_S8.jpg" 
title="Wahh bhaiya full among us baaji" channel="prajjwal._" views="10"  date="21 October 2020"  avatar="P"/>
<VideoCard url="https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2FDesert.jpg?alt=media&token=8202165c-9d81-4095-b6bf-b5ac8d2b5a60" 
title="Best Maggie in timelapse" channel="Kabhi Khana Tum Meri Gali" views="11k"  date="21 October 2020"  avatar="K" />
<VideoCard url="https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2Fdownload.jpg?alt=media&token=f7016a04-3e71-4dec-a24a-6db9597b5b2b" 
title="why would life take us on like that huh" channel="Vineeta" views="1k"  date="21 October 2020"  avatar="V"/>
</div>
{//{/*profile all the time, upload option here*/}
//{/*top 3*/}
    }
    {/*<div className="timePass">

      <VideoPlayer url=
      "https://firebasestorage.googleapis.com/v0/b/cotereie.appspot.com/o/images%2FVanilla%20Custard%20Cake%20_%20Eggless%20_%20Without%20oven.mp4?alt=media&token=2748214d-3117-424e-a8b4-2b577691d164"/>
      
    
  </div>*/}
  </div></div>
     )
}

export default HomePage
