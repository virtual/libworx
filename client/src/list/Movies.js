import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Searchbox from '../search/Searchbox';
import ListItem from '../list/ListItem';
let axios = require('axios');

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      data: null
    }
    this.updateResults = this.updateResults.bind(this);
  }
  updateResults(query) {
    this.props.movieStore.getMovieList(query).then((res) => {
      this.setState({
        data: res.data
      })
    }).catch((e) => {
      console.log(e)
    })
  }
  componentDidMount() {
    if (!(this.state.initialized)) {
      this.setState({
        initialized: true,
        data: this.props.movieStore.getMovieList()
      })
    }
  }
  render() {
   let listHtml = [];
   if (this.state.initialized) {
     if (this.state.data.results) {
        this.state.data.results.forEach((e, i) => {
        listHtml.push(
        <ListItem 
          key={"title"+i} 
          id={e.id}
          title={e.title} 
          image={"http://image.tmdb.org/t/p/w300/" + e.poster_path}
          description={this.props.movieStore.text_truncate(e.overview)}
          extra={e.genre_ids}
          rating={e.vote_average}
          date={e.release_date}
          genres={this.props.movieStore.genres}
          />
        )
      })
    } else {
      listHtml.push(<li key="noresults">No results</li>)
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

export default withRouter(inject('movieStore')(MovieList));