import classes from './Home.module.css';
import React, { useEffect,useState } from 'react';
import TweetBar from '../TweetBar/TweetBar';
import Tweet from '../Tweet/Tweet';
import Footer from '../Footer/Footer';
import axios from '../../axios';
import Spinner from '../Spinner/Spinner';


const Home = () =>{
  
    const month =['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
     const [pending, setPending] = useState(false);
  
     const [tweetData,setTweetData] = useState([]);
     const [userData,setUserData] = useState({});
  
    useEffect(()=>{
      setPending(true);
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
        ans.reverse();
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

    return (
        <div className = {classes.Home}>
            <h1>Home</h1>
            <hr   className={classes.Hr}  />
            <TweetBar/>
            <hr   className={classes.Hr2}  />

            <div className = {classes.tweets}>

            {
           
             tweetData.map((e) =>{ 
               const personHandle =  userData[e.UID];
               let name = null;
               let userid = null;
               if(personHandle != null){
                 name = personHandle.FirstName + ' ' + personHandle.LastName ;
                 userid = personHandle.UserId;
               }
 
               let data = null;
               if(personHandle !== null){
                 data = (
              <React.Fragment key = {e.id} >
              <Tweet name={ name } 
              id = {e.id}
              userid ={ userid } 
              date = { month[e.TweetMonth] + ' ' +e.TweetYear}
               body = {e.Text} />
              <hr   className={classes.Hr2}  />
                   </React.Fragment>
                 );
               }  
               return data;
             }


           )
           
           
           }

           </div>

           <hr   className={classes.Hr3}  />
           <Footer/>
        </div>  
    );
}

export default Home;