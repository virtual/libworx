import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Movie from '../list/Movie';

export default class ShowList extends Component {
  constructor() {
    super();
    this.state = {
      collection: []
    }
  }

  componentDidMount() {
    console.log(this.props.collection)
    this.setState({collection: this.props.collection});
  }
  render() {
    console.log(this.state)
    if (this.state.collection.length > 0) {
      function displayMe(collection) {
        console.log(collection)
        let col = [];
        collection.forEach((e, i)=> {
          console.log('e',e)
          col.push(<Movie key={i} id={e.external_id} />)
        })
        return col;
      }
      console.log(this.state.collection)
       let col = displayMe(this.state.collection);
      //let col = displayMe([{name: 'mew', name: 'lion king'}]);
      
      return (
        <div>
          <h2>Collection</h2>
          <Card.Group stackable={true} itemsPerRow={4} doubling={true}>
          {col}
          </Card.Group>
        </div>
      );
    } else {
      return ( <p></p> )
    }
  }
}