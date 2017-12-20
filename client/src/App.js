import React, { Component } from 'react'; 
import './App.css';
import Menu from "./menu/Menu";
import SliderContent from "./carousel/SliderContent";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap'; 
import Footer from './footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
        <SliderContent/>
        <p className="App-intro">
          Libworx homepage To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer/>
      </div>
    );
  }
}

export default App;
