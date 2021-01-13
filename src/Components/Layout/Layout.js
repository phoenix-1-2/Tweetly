import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../Navbar/Nav';
import {AuthProvider} from '../Auth/Auth';

const Layout = (props)=>(
  <AuthProvider>
  <BrowserRouter>
    <React.Fragment>
      <Nav/>
      {props.children}
    </React.Fragment>
  </BrowserRouter>
  </AuthProvider>
)
export default Layout;
