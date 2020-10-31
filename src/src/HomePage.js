import React, { useState,useEffect } from 'react'
import Sidebar from "./Sidebar"
import "./HomePage.css"
import {auth,db,storage} from "./firebase"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar"
import Header from "./Header"
import VideoPlayer from "./VideoPlayer/VideoPlayer"
import VideoCard from "./VideoCard/VideoCard"
import Carousel from "react-bootstrap/Carousel"; 
import firebase from "firebase"
import {Button} from '@material-ui/core'
import {Link} from "react-router-dom";
// import {loadStripe} from "@stripe/stripe-js"
// import {Elements} from '@stripe/react-stripe-js'

// const promise = loadStripe(
//   pk_test_51HhcNeHdCMWk0EMNO6e6u9aYEFt8Wcb6R19nrSyXLDmn9BFxMsT0iNtUzBE3weGbMceM0E2epln0rtgESQ6ZXxk500crXRkcex
// )


function HomePage() {
const [videos, setVideos]=useState([])


useEffect(()=>
{
  db.collection('VideosUser').orderBy('timestamp').onSnapshot(snapshot => {
    setVideos(snapshot.docs.map(doc=> ({
      id:doc.id,
      data:doc.data()}) ))
  })
},[])



    return (
        <div className="homePage">
          
           <Header/>
         
              <Sidebar/>
{/*feed*/}
<div className="homeBlock">
{/*<h2 style={{color:"white"}}>Featured</h2>*/}

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

      
      <div className="videoHere">
      

     { /*<VideoCard image="https://cdn-www.bluestacks.com/bs-images/AU_BeginnersGuide_S8.jpg" 
title="Wahh bhaiya full among us baaji" channel="prajjwal._" views="10M views" 
 timestamp="21 October 2020"  
 channelImage="shorturl.at/agEP9"
 />*/}
 
{
videos.map(({id,data}) => (
<VideoCard title={data.title} channel={data.channel} views={data.views}
timestamp={new Date(data.timestamp.seconds * 1000).toLocaleDateString("en-US")}
channelImage={data.channelImage}
image={data.image} 
id={id}

></VideoCard>


))
}
{/* 
<Elements stripe={promise}>
<Button>Hmlo</Button></Elements> */}

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
