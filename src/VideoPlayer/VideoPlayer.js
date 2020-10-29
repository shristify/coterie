import React,{useState} from 'react'
import Container from '@material-ui/core/Container'
import ReactPlayer from 'react-player'
import "./VideoPlayer.css"
import Grid from '@material-ui/core/Grid'
import {Typography, Button, IconButton} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward10Icon from '@material-ui/icons/Forward10';
import Replay10Icon from '@material-ui/icons/Replay10';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


function VideoPlayer({url}) {

 const [state, setState]=useState({
     play:true
 })

 

    return (
        <div className="videoplay">
          <Container maxWidth="md">
              <div className="player">
          <ReactPlayer
          className='react-player'
          url={url}
          width='500px'
          height='400px'
          playing={false}
          loop={true}
          muted={false}
          controls={true}
    />
   {/* <div className="controls">
       <Grid container direction="row" alignItems='center' justify-content="space-between"
       style={{padding:16}}>
         
         <Grid item>
            <Typography variant="h5" >Title</Typography>
         </Grid>

         <Grid item>
             <Button
             variant="contained"
             color="secondary">
                 Bookmark
             </Button>

         </Grid>

       </Grid>

       <Grid container direction="row" alignItems='center' justify="center"
       >
    
     
     <IconButton className="controlButton">
         <Forward10Icon fontsize="inherit"></Forward10Icon>
     </IconButton>
     <IconButton className="controlButton">
         <PauseIcon fontsize="inherit"></PauseIcon>
     </IconButton>
     <IconButton className="controlButton">
         <Replay10Icon fontsize="inherit"></Replay10Icon>
     </IconButton>
     

       </Grid>

       <Grid container direction="row" alignItems='center' justify-content="space-between"
       style={{padding:16}}> 
        <Grid item xs={12}>
        <PrettoSlider
        min={0} max={100} defaultValue
        ={50}
        ValueLabelComponent={ValueLabelComponent}/>

         </Grid>
      
       <Grid item >
       <Grid container direction="row" alignItems='center'>
       <IconButton className="belowButton">
         <PlayArrowIcon fontsize="small"></PlayArrowIcon>
     </IconButton>

     <IconButton className="belowButton">
         <VolumeUpIcon fontsize="small"></VolumeUpIcon>
     </IconButton>
 
  <Slider max={100} min ={0} defaultValue={100} className='volumeSlider'></Slider>
     
            </Grid>
        </Grid>

       </Grid>
    </div>*/}
    </div>
              </Container>  
        </div>
    )
}

export default VideoPlayer
