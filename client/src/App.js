import React, { Component } from 'react'; 
import './App.css';
import Menu from "./menu/Menu";
import SliderContent from "./carousel/SliderContent";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import MovieList from './list/Movies';
import Footer from './footer/Footer';
import { Container, Button } from 'semantic-ui-react'


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Menu/>
          <SliderContent/>
          
          <Container style={{flex: 1}} className="maincontent">
            <Route exact path="/movies" render={()=> <MovieList /> }/>
 
          </Container>
          <Footer/>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
