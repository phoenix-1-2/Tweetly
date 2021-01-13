import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {Button} from 'reactstrap';
import classes from './TweetBar.module.css';
import axios from '../../axios';
import app from '../Auth/base';


const TweetBar = (props)=>{
  const [tweet,setTweet] = useState('');
  const uploadTweet = () =>{
    var today = new Date();
    var TweetMonth = today.getMonth();
    var TweetYear = today.getFullYear();
    var user = app.auth().currentUser;

    axios.post('/tweetData.json',{
      Tweet : tweet,
      UID : user.uid,
      TweetMonth : TweetMonth,
      TweetYear : TweetYear,
      count:0,
      likedOwn : false,
    }).then(_=>{
      setTweet('');
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
      
    });

  }

  let btn = (<Button
    onClick = {uploadTweet}
          className={classes.btn}
          color='primary' size ='md'
         > Tweet</Button>);

    if(tweet.length===0){
      btn=(<Button
      disabled
        onClick = {uploadTweet}
              className={classes.btn}
              color='primary' size ='md'
             > Tweet</Button>);
    }
    return (

      <Grid className ={classes.box}  spacing={10}  >
      <Grid className="d-flex" item form="maincomponent" >

        <input  
        value = {tweet}
        onChange = {(event) => setTweet(event.target.value) }    
        maxLength={250}
        style={{
          border : '0',
          color : 'white',
          backgroundColor:'#15202B'
        }}
        className = {classes.textBox}
        type='text' placeholder="What's Happening?" />

        {btn}
      </Grid>
    </Grid>
);
}
export default TweetBar;