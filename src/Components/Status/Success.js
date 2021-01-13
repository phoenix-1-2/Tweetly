import { Button } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert,Card } from 'reactstrap';
import classes from './status.module.css';
const app = ()=>{

   return ( 


<Card className={classes.card}>
<Alert color="success">
    <h3 style={{
        textAlign:'center'
    }} > Saved the changes.  </h3>
    <Link style={{
      textDecoration:'none'
  }} to='/'> 
  <Button color="success" size="lg" block> Back To Home </Button>{' '}
  </Link>
  </Alert>

  </Card>
  
  )


};

export default app;