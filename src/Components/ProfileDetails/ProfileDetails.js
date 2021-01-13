import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardHeader
  } from 'reactstrap';
import classes from '../Profile/Profile.module.css';
import photo from '../../img/default_profile.png';
import Tweet from '../Tweet/Tweet';
import {Link} from 'react-router-dom';
import app from '../Auth/base'


const ProfileDetails = (props)=>{

  const month =['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  

    return (
        <Card className ={classes.ProfileDetails} >
        <CardHeader>
        <img
        alt = ""
        src = {photo} 
        className={classes.photo} 
        style={{
			borderRadius:'200px',
			height: '200px',
			width: '200px'
        }} />

        <h2>
        {props.name}
        </h2>
        <span className="mb-2 text-muted" > @{props.userName} </span>
        <span className="mb-2 text-muted"> &middot; {month[props.joiningMonth]} {props.joiningYear} </span>
        </CardHeader>
        <CardBody>
          <Link to="/edit"><CardTitle tag="h5">Edit Details</CardTitle></Link>
          <CardText>
          <hr   className={classes.Hr}  />
              <h3>Your Tweets</h3>
          <hr   className={classes.Hr}  />

          <div className = {classes.profileTweets}>

            {
           
            props.tweetData.map((e) => { 
              var user = app.auth().currentUser;
              if(user.uid === e.UID){

                const personHandle =  props.userData[e.UID];
                // console.log(props.userData);
                console.log(e);


                let name = null;
                let userid = null;
                if(personHandle != null){
                  name = personHandle.FirstName + ' ' + personHandle.LastName ;
                  userid = personHandle.UserId;
                }
  
                let data = null;
  
                if(personHandle !== null){
                  data = (
              <React.Fragment key = {e.id}>
              <Tweet 
              name={ name } 
              id = {e.id}
              userid ={ userid } 
              body = {e.Text}
              date = { month[e.TweetMonth] + ' ' +e.TweetYear}
                />
               <hr   className={classes.Hr2}  />
                    </React.Fragment>
                  );
                }  
                return data;
              }

              return null;


            })
            
            
            }
           </div>

          </CardText>
        </CardBody>
      </Card>  
    );
}

export default ProfileDetails;