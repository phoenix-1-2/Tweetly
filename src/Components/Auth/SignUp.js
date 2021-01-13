import classes from './Auth.module.css';
import React, { useState,useCallback } from 'react';
import Footer from '../Footer/Footer';
import {
 Card,CardBody,CardHeader
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import app from './base';

const SignUp = ({history}) =>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      history.push("/edit");
    } catch (error) {
      alert(error);
    }
  }, [history,email,password]);

    return (
      <React.Fragment className={classes.body}>
      <Card  
      className={classes.LogIn}
    > 
      <CardHeader>
      <h4 class="text-center" > Sign Up </h4>
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
  
  
         <hr  className={classes.Hr}  />
  
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
  
  <Link to='/login'>Already Signed Up ?</Link>
  
  <hr className={classes.Hr}  style={{
    visibility:'hidden'
  }} />
            <button 
            onClick ={handleSignUp}
            className="btn btn-primary btn-block "
            style={{
              padding:'7px' ,
            paddingLeft: '10px',
            paddingRight: '10px',
            fontSize: '20px',
            float: 'right',
            fontWeight: '400',
            }} >Sign Up</button>
      </CardBody>
      </Card>
           <Footer/>
    </React.Fragment>
    );
  };
  
  export default withRouter(SignUp);