import React, { Component } from 'react'; 
import { Container, Button } from 'semantic-ui-react';

export default class SliderContent extends React.Component {
  render() {
    return (
 
        <header className="App-header">
         
          <h1 className="App-title">Manage Your Libraries</h1>
          <Button primary>Get Started</Button>{' '}
        <Button secondary>Learn More</Button>{' '}
      
        </header>  
    );
  }
}