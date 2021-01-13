import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Auth/SignIn' ;
import SignUp from './Components/Auth/SignUp';
import Profile from './Components/Profile/Profile';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Editprofile from './Components/EditProfile/EditProfile';
import Success from './Components/Status/Success';
import Failure from './Components/Status/Failure';
function App() {
  return (
    <Layout>

      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/edit" exact component = {Editprofile} />
      <PrivateRoute path="/success" exact component = {Success} />
      <PrivateRoute path="/failure" exact component = {Failure} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      
      

    </Layout>
  );
}

export default App;
