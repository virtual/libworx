import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
const axios = require('axios');

var Logout = observer(class Logout extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.userStore.logout().then((res)=>{ 
      if (res.data.loggedIn === false){
       this.props.history.push("/login"); 
      } else {
        console.log(res.data.message)
      }
    }).catch((e)=> {
      console.log(e)
    })
  }
  render () {
    return (
      <div><p>You have logged out.</p></div>
    );
  }
});
export default withRouter(inject('userStore')(Logout));