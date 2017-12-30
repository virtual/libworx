import React, { Component } from 'react';
import Searchbox from '../search/Searchbox';
let axios = require('axios');

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      data: null
    }
    this.updateResults = this.updateResults.bind(this);
    this.getMovieList = this.getMovieList.bind(this);
  }

  getMovieList(q) {
    return new Promise((resolve, reject) => {
      axios.post('/results', {query: q}).then((res) => {
        this.setState({
          data: res.data,
          initialized: true
        })  
        resolve(res.data);
      });
    })
  }
 
  updateResults(query) {
    console.log(query);
    this.getMovieList(query);
  }
  componentDidMount() {
    if (!(this.state.initialized)) {
      this.getMovieList();
    }
  }
  render() {
   let listHtml = [];
   if (this.state.initialized) {
     if (this.state.data.results) {
      this.state.data.results.forEach((e, i)=> {
        listHtml.push(<li key={"title"+i}>{e.title}</li>)
      })
    } else {
      listHtml.push(<li>No results</li>)
    }

      return (
        <div>
          <h1>Movies</h1>

          <Searchbox label="Search movies" submit={this.updateResults}/>
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

 