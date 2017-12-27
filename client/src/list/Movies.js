import React, { Component } from 'react';
let axios = require('axios');

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      data: null
    }
  }

  getMovieList() {
    return new Promise((resolve, reject) => {
      axios.post('/results', {query: "lion"}).then((res) => {
        this.setState({
          data: res.data,
          initialized: true
        })  
        resolve(res.data);
      });
    })
  }
 

  componentDidMount() {
    if (!(this.state.initialized)) {
      this.getMovieList();
    }
  }
  render() {
   let listHtml = [];
   if (this.state.initialized) {
     this.state.data.results.forEach((e, i)=> {
       listHtml.push(<li key={"title"+i}>{e.title}</li>)
     })

      return (
        <div>
          <h1>Movies</h1>
          <ul>{listHtml}</ul>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

 