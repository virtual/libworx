import React, { Component } from 'react'; 
import './App.css';
import Menu from "./menu/Menu";
import SliderContent from "./carousel/SliderContent";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap'; 
import { BrowserRouter as Router, Route} from 'react-router-dom';
import MovieList from './list/Movies';
import Footer from './footer/Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Menu/>
          <SliderContent/>
          <Route exact path="/movies" render={()=> <MovieList /> }/>
          <p className="App-intro">
            Libworx homepage To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Footer/>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
