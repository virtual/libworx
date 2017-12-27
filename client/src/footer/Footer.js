import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <div className="ui inverted vertical footer segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="three wide column">
          <h4 className="ui inverted header">About</h4>
          <div className="ui inverted link list">
            <Link to="/movies">Movies</Link>
          </div>
        </div>
        <div className="three wide column">
           
        </div>
        <div className="seven wide column">
          <h4 className="ui inverted header">Footer Header</h4>
          <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
        </div>
      </div>
    </div>
  </div>

    );
  }
}