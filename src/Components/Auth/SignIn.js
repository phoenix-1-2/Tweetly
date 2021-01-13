import classes from './Auth.module.css';
import React, { useState,useCallback, useContext } from 'react';
import {
  Card,CardBody,CardHeader
 } from 'reactstrap';
import Footer from '../Footer/Footer';
import {withRouter,Redirect, Link} from 'react-router-dom';
import app from './base';
import {AuthContext} from './Auth';
const Login = ({history}) =>{

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  
  const handleSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history,email,password]
  );


  const {currentUser} = useContext(AuthContext);

  if(currentUser){
    return  <Redirect to='/' />;
  }
  
    return  (
      <React.Fragment className={classes.body}>
        <Card  
        className={classes.LogIn}
      > 
        <CardHeader>
        <h4 class="text-center" > Log In</h4>
        </CardHeader>
        <CardBody>
  
        <input 
        onChange = {(event)=>setEmail(event.target.value)}
          maxLength={250}
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type='email' placeholder="Email ID" />
  
  
           <hr className={classes.Hr}  />
  
          <input 
          onChange = {(event)=>setPassword(event.target.value)}
          maxLength={250}
          style={{
            border : '0',
            color : 'white',
            backgroundColor:'#15202B'
          }}
          className = {classes.textBox}
          type='password' placeholder="Password" />
  
           <hr className={classes.Hr}  />
  
  <Link to='/signup'>Not Registered Yet ?</Link>
  <hr className={classes.Hr}  style={{
    visibility:'hidden'
  }} />
           
              <button 
              onClick = {handleSignIn}
  
              className="btn btn-primary btn-block "
  
              style={{
                padding:'7px' ,
              paddingLeft: '10px',
              paddingRight: '10px',
              fontSize: '20px',
              float: 'right',
              fontWeight: '400',
              }} >Log In</button>
        </CardBody>
        </Card>
             <Footer/>
      </React.Fragment>
    );
  };
  
  export default withRouter(Login);