import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import { red, purple, lightBlue, yellow } from '@material-ui/core/colors';

import "./VideoCard.css"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
   
    marginLeft:90,
    color: yellow
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: purple[500],
  },
}));

export default function ReviewCard({url,title,channel,views, date,avatar}) {
  const classes = useStyles();
  



  return (
      <div className="outBox">
    <Card className={classes.root}>
     
      <CardMedia
        className={classes.media}
        image={url}
        title={title}
        style={{color:"white"}}
      />
      <CardHeader className="headerCard"
        avatar={
          <Avatar aria-label="name" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
       title={title}
       
       style={{color:"white"}}/>
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p"  style={{color:"white"}}>
        {channel}<hr></hr>
         {date} * {views}
        </Typography>
      </CardContent>
    </Card></div>
  );
}