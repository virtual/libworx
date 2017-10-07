import React, { Component } from 'react'; 
import { Button } from 'reactstrap';

export default class SliderContent extends React.Component {
  render() {
    return (
 
        <header className="App-header">
         
          <h1 className="App-title">Manage Your Libraries</h1>
          <Button color="primary">Get Started</Button>{' '}
        <Button color="secondary">Learn More</Button>{' '}
      
        </header>  
    );
  }
}