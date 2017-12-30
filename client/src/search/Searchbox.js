import React, { Component } from 'react';
import { Message } from 'semantic-ui-react'

export default class Searchbox extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value);
    if (e.target.value) {
      this.setState({
        query: e.target.value,
        error: ''
      })
    } else {
      console.log('error)')
      this.setState({
        query: '',
        error: "Input must not be empty"
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.query) {
      this.props.submit(this.state.query);
    } else {
      this.setState({
        error: "Input must not be empty"
      })
    }
  }
  render() {
    let label = (this.props.label) ? this.props.label : "Search";
    let messageList = [];
  
    if (this.state.error != '') {
      messageList.push(<Message
        error
        list={[this.state.error]}
      />)
    } else {
      messageList = []
    }
    return (
      <form className="searchbox">
        <label htmlFor="search">{label}</label>
        <input name="search" value={this.state.query} id="search" onChange={this.handleChange} />
        <input type="submit" onClick={this.handleSubmit}/> 
        {messageList}
        
      </form>
    );
  }
}