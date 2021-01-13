import React,{useState,useEffect} from 'react';
import Footer from '../Footer/Footer';
import classes  from './Profile.module.css';
import axios from '../../axios';
import app from '../Auth/base';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import Spinner from "../Spinner/Spinner";

const Profile = ()=>{
  const [firstName,setFirstName] = useState('Not Set');
  const [userId,setUserId] = useState('Not Set');
  const [lastName,setLastName] = useState('');
   const [joiningMonth,setJoiningMonth] = useState('');
   const [joiningYear,setJoiningYear] = useState('');
   const [pending, setPending] = useState(false);

   const [tweetData,setTweetData] = useState([]);
   const [userData,setUserData] = useState({});

  useEffect(()=>{
    setPending(true);
    var user = app.auth().currentUser;
    axios.get('/userData.json').then(response =>{
      
      const retrieveData = response.data;
      let data = null;
      for (let keys in retrieveData){
        if(retrieveData[keys]['UID'] === user.uid){
          data = retrieveData[keys];
          break ;
        }
      }
      if(data !== null){        
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setUserId(data.UserId);
        setJoiningYear(data.JoiningYear);
        setJoiningMonth(data.JoiningMonth);
      }
    });
    axios.get('/tweetData.json').then(response1 =>{
      let ans = [];
      for(let keys in response1.data){
        ans.push({
          Text : response1.data[keys].Tweet,
          TweetYear : response1.data[keys].TweetYear,
          TweetMonth : response1.data[keys].TweetMonth,
          UID : response1.data[keys].UID,
          count : response1.data[keys].count,
          id : keys,
        })
      }
      ans = ans.reverse()
      setTweetData(ans);  

      axios.get('/userData.json').then(response =>{
        ans = {}
        for(let keys in response.data){
          ans[response.data[keys].UID] = {
            FirstName : response.data[keys].FirstName,
            LastName  : response.data[keys].LastName,
            UserId : response.data[keys].UserId,
          };
        }
        setUserData(ans);  
      })

    })
    
    

    setPending(false);

  },[]);

  if(pending){
    return <Spinner />
  }
  let Ans = <Spinner />;
  if(!pending){
    Ans = ( <ProfileDetails 
      name = {firstName + ' ' + lastName}
      userName = {userId}
      joiningMonth = {joiningMonth}
      joiningYear = {joiningYear}
      tweetData = {tweetData}
      userData = {userData}
      />);
  }

    return (
        <div className = {classes.Profile}>
            <h1>Profile</h1>
            <hr   className={classes.Hr}  />


          {Ans}


            <hr   className={classes.Hr3}  />
           <Footer/>
        </div>  
    );
}

export default Profile;