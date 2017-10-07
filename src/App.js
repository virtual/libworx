import React, { Component } from 'react'; 
import './App.css';
import Menu from "./menu/Menu";
import SliderContent from "./carousel/SliderContent";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
var config = require('./config.js');
console.log(config.moviedbAPI);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
        <SliderContent/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
