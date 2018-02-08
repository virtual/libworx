import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ShowList from './ShowList';
const axios = require('axios');

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      collection: [],
      loaded:false
    }
    this.getCollection = this.getCollection.bind(this);
  }
  getCollection(){
    this.props.userStore.userCollection().then((res)=>{
        console.log(res.data);
        console.log ('seting state')
        this.setState( {
          collection: res.data,
          loaded: true
        }) 
    }).catch((e)=> {
      console.log(e)
    })
  }
  componentDidMount() {
    this.getCollection()
  }
  render() {
    console.log(this.state.collection)
    if (this.state.loaded) { // checking for this instead of state.collection makes page rerender correctly
    return (
      <div>
        <ShowList collection={this.state.collection} />
      </div>
    );
  } else {
    return (
      <p>Wait for it....</p>
    )
  }
  }
}

export default withRouter(inject('userStore')(Dashboard));