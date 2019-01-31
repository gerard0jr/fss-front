import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

const Routes = () => {
  return (
    <Switch>
      <Route path="/home" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Switch>
    )

}

export default Routes
