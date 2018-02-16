import React, { Component } from 'react';

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
          col.push(<p key={i}>Media ID: {e.name}</p>)
        })
        return col;
      }
      console.log(this.state.collection)
       let col = displayMe(this.state.collection);
      //let col = displayMe([{name: 'mew', name: 'lion king'}]);
      
      return (
        <div>
          <h2>Collection</h2>
          {col}
        </div>
      );
    } else {
      return ( <p></p> )
    }
  }
}