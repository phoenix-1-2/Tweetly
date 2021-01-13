import React, { useEffect, useState,} from 'react';
import classes from '../Auth/Auth.module.css';
import { useHistory } from "react-router-dom";
import Footer from '../Footer/Footer';
import {Card,CardBody,CardHeader} from 'reactstrap';
import axios from '../../axios';
import app from '../Auth/base';

const EditProfile = () =>{
  
  const [firstName,setFirstName] = useState();
  const [userId,setUserId] = useState();
  const [lastName,setLastName] = useState();
  const [dob,setDob] = useState();
  const [location,setLocation] = useState();

  const history = useHistory();


  


  useEffect(()=>{
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
        setDob(data.DOB);
        setLocation(data.Location);
        setUserId(data.UserId);
      }
      
    });
    


  },[]);

  const uploadProfileDetails= ()=>{
    let oldData = null;
    var user = app.auth().currentUser;
    axios.get('/userData.json').then(response =>{
     
      let key = null;
      const retrieveData = response.data;
      for (let keys in retrieveData){
        if(retrieveData[keys]['UID'] === user.uid){
          key = keys;
          oldData = retrieveData[keys];
          break ;
        }
      }
      if(key !== null){
        axios.delete('/userData/' + key + '.json' ).then(_=>{});
        console.log(oldData);
      }
  });
    
    let data = {
      UID : user.uid,
      FirstName : firstName,
      LastName : lastName,
      DOB : dob,
      JoiningYear : (new Date()).getFullYear(),
      JoiningMonth : (new Date()).getMonth(),
      Location : location ,
      UserId : userId 
    }

    if(oldData !== null){
      data.JoiningMonth = oldData.JoiningMonth;
      data.JoiningYear = oldData.JoiningYear;
    }
    

    axios.post('/userData.json',data).then((response)=>{
      history.push('/success');
    }).catch(error =>{
      history.push('/failure');
    })


  }
  

    return (
        <React.Fragment className={classes.body}>
        <Card  
        className={classes.LogIn}
      > 
        <CardHeader>
        <h4 class="text-center" > Your Profile</h4>
        </CardHeader>
        <CardBody>

        <input 
        value = {userId}
        onChange = {(event) => setUserId(event.target.value)}
         autoComplete="off"
         autoCorrect="off"
         autoSave="off"
          maxLength={20}
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type='text' placeholder="User Name" />

           <hr className={classes.Hr}  />
  
        <input 
        value = {firstName}
        onChange = {(event) => setFirstName(event.target.value)}
         autoComplete="off"
         autoCorrect="off"
         autoSave="off"
          maxLength={250}
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type='text' placeholder="First Name" />

           <hr className={classes.Hr}  />
        
           <input 
           value = {lastName}
           onChange = {(event) => setLastName(event.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
          maxLength={250}
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type='text' placeholder="Last Name" />

  
  
           <hr className={classes.Hr}  />
  
           <input
           value = {dob}
           onChange = {(event) => setDob(event.target.value)} 
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type="date"/>

<hr className={classes.Hr} placeholder="DOB"  />

          <input 
          value = {location}
          onChange = {(event) => setLocation(event.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoSave="off"
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type="text" placeholder="Location"/>
        

  
  
           <hr className={classes.Hr}  />
  
  <hr className={classes.Hr}  style={{
    visibility:'hidden'
  }} />
           
              <button  
              onClick = {uploadProfileDetails}
              className="btn btn-primary btn-block "
              style={{
                padding:'7px' ,
              paddingLeft: '10px',
              paddingRight: '10px',
              fontSize: '20px',
              float: 'right',
              fontWeight: '400',
              }} >Save Changes</button>
        </CardBody>
        </Card>
             <Footer/>
      </React.Fragment>
    )
};

export default EditProfile ;