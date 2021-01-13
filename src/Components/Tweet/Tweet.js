import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Card,CardBody,CardHeader} from 'reactstrap';
import photo from '../../img/default_profile.png'
import axios from '../../axios';
import app from '../Auth/base';


const Tweet = (props)=>{
  
  const [liked,setLiked] = useState(false);
  const [likedBy,setLikedBy] = useState();

  useEffect(()=>{
    var user = app.auth().currentUser;
    axios.get('/tweetData/'+ props.id +'.json').then(response=>{
      if(response.data !== null ){
        if(user.uid === response.data.UID){
          setLiked(response.data.likedOwn);
        }
        setLikedBy(response.data.count);
      }

    })
  },[props.id]);

  const updateCount = () =>{
    if(liked){
      
      axios.get('/tweetData/' +  props.id  + '.json').then(response=>{
        let data = {};
        data = response.data;
        data.count = data.count - 1;
        data.likedOwn = false;
        setLiked(false);
        setLikedBy(data.count);
        axios.put('/tweetData/' +props.id +'.json',data).then(_=>console.log('Data Saved'));
      });
    }
    else{

      axios.get('/tweetData/' +  props.id  + '.json').then(response=>{
        let data = {};
        data = response.data;
        data.count +=1;
        data.likedOwn = true;
        setLiked(true);
        setLikedBy(data.count);
        axios.put('/tweetData/' +props.id +'.json',data).then(_=>console.log('Data Saved'));
      });

    }


    
  }



  let likeButton = (<div>
    <FavoriteIcon onClick = { updateCount }/>
    <span className=" ml-2 mb-2 text-muted">{likedBy}</span>
    </div>
    );
  
    if(liked){
      likeButton = (<div 
        style={{
        color : '#f50057',
      }} >
        <FavoriteIcon onClick = {updateCount} />
        <span className=" ml-2 mb-2 text-muted">{likedBy}</span>
        </div>
        );
    }


    return (
        <Card 
        style={{
            border : '0',
            textAlign :'left',
            color : 'white',
            backgroundColor:'#15202B'
          }}>
        <CardHeader>
        <h5>
        <img src={photo} alt="" style={{
          margin : '1%',
		borderRadius:'50px' ,
		height: '50px',
		width: '50px',
		float: 'left',
  }}/>
         {props.name} 
        <span className="mb-2 text-muted"> {props.userid} </span>
        <span className="mb-2 text-muted"> &middot; {props.date} </span>
        </h5>
        </CardHeader> 
        <CardBody>
        <p>{props.body}</p>
        {likeButton}
        </CardBody>
      </Card>
    )
}
export default Tweet;