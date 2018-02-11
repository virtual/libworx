import React, { Component } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Menu from "./menu/Menu";
import Homepage from './homepage/Homepage';
import MovieList from './list/Movies';
import Dashboard from './user/Dashboard'

import Login from './login/Login'
import Logout from './login/Logout'
import SignUp from './login/Signup'

import Footer from './footer/Footer';

import UserStore from './stores/UserStore';
import MovieStore from './stores/MovieStore';
import { Container, Button } from 'semantic-ui-react'
import {Provider} from 'mobx-react';


class App extends Component {
  constructor() {
    super();
    this.userStore = {
      message: 'none'
    }
  }
  render() {
    return (
      <Provider userStore={new UserStore()} movieStore={new MovieStore()} >
      <div className="App">
      <Router>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Menu/>
          <Route exact path="/" render={()=> <Homepage /> }/>
          <Container style={{flex: 1}} className="maincontent">
            <Route exact path="/movies" render={()=> <MovieList /> }/>
            <Route exact path="/signup" render={()=> <SignUp /> }/>
            <Route exact path="/dashboard" render={()=> <Dashboard /> }/>
            <Route exact path="/login" render={()=> <Login /> }/>
            <Route exact path="/logout" render={()=> <Logout /> }/>
 
          </Container>
          <Footer/>
        </div>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
