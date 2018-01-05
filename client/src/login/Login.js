import React, {
  Component
} from 'react';
var axios = require("axios")

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    var url = '/auth/github'
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.user = res.data.user;
          // this.message = res.data.message;
          this.success = true;
          // this.props.history.push("/"); 
        } else {
          reject(res.data);
        }
        resolve(res.data)
        this.setState = {
          data: res.data
        }
      });
    }).catch(e => {
      console.log(e);
    });
    console.log('login')
  }
  render() {
    console.log(this.state.data);
    return (  
      <button onClick = {
        this.handleClick
      } > Login with Github </button>   
    );
  }
}