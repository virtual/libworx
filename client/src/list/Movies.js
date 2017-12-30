import React, { Component } from 'react';
import Searchbox from '../search/Searchbox';
import ListItem from '../list/ListItem';
import { Card, Icon, Image } from 'semantic-ui-react'

let axios = require('axios');

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      genres: [],
      data: null
    }
    this.updateResults = this.updateResults.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getMovieList = this.getMovieList.bind(this);
    this.text_truncate = this.text_truncate.bind(this);
  }

  text_truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

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

  getGenres() {
    return new Promise((resolve, reject) => {
      axios.get('/genres').then((res) => {
        console.log(res.data);
        this.setState({
          genres: res.data.genres 
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
      this.getGenres();
      this.getMovieList();
    }
  }
  render() {
   let listHtml = [];
   if (this.state.initialized) {
     if (this.state.data.results) {
      this.state.data.results.forEach((e, i)=> {
        console.log(e);
        listHtml.push(
        <ListItem 
          key={"title"+i} 
          title={e.title} 
          image={"http://image.tmdb.org/t/p/w300/" + e.poster_path}
          description={this.text_truncate(e.overview)}
          extra={e.genre_ids}
          rating={e.vote_average}
          date={e.release_date}
          genres={this.state.genres}
          />
        )
      })
    } else {
      listHtml.push(<li>No results</li>)
    }

      return (
        <div>
          <h1>Movies</h1>

          <Searchbox label="Search movies" submit={this.updateResults}/>
          <Card.Group stackable={true} itemsPerRow={4} doubling={true}>
            {listHtml}
            </Card.Group> 
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

 