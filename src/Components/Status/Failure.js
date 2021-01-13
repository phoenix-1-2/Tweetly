import { Button } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert,Card } from 'reactstrap';
import classes from './status.module.css';
const app = ()=>{

   return ( 


<Card className={classes.card}>
<Alert color="danger">
<h3 style={{
        textAlign:'center'
    }} >
   Something Went Wrong !!
   Please Try Again 
   </h3>
  </Alert>

  <Link style={{
      textDecoration:'none'
  }} to='/edit'> 
  <Button color="danger" size="lg" block> Try Again </Button>{' '}
  </Link>
  </Card>
  
  )


};

export default app;