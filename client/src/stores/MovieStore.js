import {extendObservable} from 'mobx';
var axios = require('axios');

export default class MovieStore {
  constructor() {
    extendObservable(this, {
      movies: null,
      genres: null,
      message: null 
    }) 
    this.getGenres();
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
        // this.movies = res.data;
        console.log(res)
        resolve(res);
      });
    })
  }

  getGenres() {
    return new Promise((resolve, reject) => {
      axios.get('/genres', {
      }).then((res) => {
        if (res.data !== undefined) {
          this.genres = res.data.genres;
        } else {
          console.log('undefined')
          reject(res);
        }
        resolve(res);
      }).catch(function (err) {
        console.log(err);
      });
    })
  }
} // closes MovieStore