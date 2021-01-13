import React from 'react';

const Footer = () => (
    <footer style = {{
      padding:'1%',
      border : '0',
      textAlign :'center',
      color : 'white',
      backgroundColor:'#15202B'
    }}>
      <p> &copy; <a href="https://nikhil-bhasin.netlify.app">Nikhil Bhasin</a> 
       {" "+(new Date()).getFullYear() + " "} &middot; All Rights Reserved  </p>
      <p>&middot; Design Inspired from Twitter UI</p>
    </footer>
  );

export default Footer;