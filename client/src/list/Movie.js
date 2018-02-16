import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ListItem from '../list/ListItem';
import undefinedPoster from'../img/undefined-media.gif';

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      data: null
    }
   this.showMovie = this.showMovie.bind(this);
  }
  showMovie(id) {
    this.props.movieStore.getMovieInfo(id).then((res) => {
      console.log(res.data)
      this.setState({
        initialized: true,
        data: res.data
      })
    }).catch((e) => {
      console.log(e)
    })
  }
  componentDidMount() {
    console.log('gonna get', this.props.id)
    if (!(this.state.initialized)) {
      this.showMovie(this.props.id)
    }
  }
  render() {
   let listHtml = [];
   if (this.state.initialized) {
     console.log(this.state.data)
     if (this.state.data) {
       let e = this.state.data;
        
       let poster = (e.poster_path)
          ? "http://image.tmdb.org/t/p/w300/" + e.poster_path 
          : undefinedPoster;

         
    
      return (
        <ListItem 
        key={"title"+e.id} 
        id={e.id}
        title={e.title} 
        image={poster}
        description={this.props.movieStore.text_truncate(e.overview)}
        extra={e.genre_ids}
        rating={e.vote_average}
        date={e.release_date}
        genres={this.props.movieStore.genres}
        />
      );
    }  else {
      return (
        <div>No results</div>
      )
    }
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default withRouter(inject('movieStore')(Movie));