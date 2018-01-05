import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import logo from '../img/libworks-logo.png';
import {Link} from 'react-router-dom';

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary stackable>
        <Menu.Item as={Link} to="/">
        <img src={logo} alt="LibWorx" />
        </Menu.Item>
          <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to="/movies" name='movies' active={activeItem === 'movies'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to="/login" name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
 
      </div>
    )
  }
}
 