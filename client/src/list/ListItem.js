import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class ListItem extends Component {
  constructor() {
    super();
    this.findObjectByKey = this.findObjectByKey.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === parseInt(value)) {
        return array[i].name;
      }
    }
    return null;
  }

  addToCollection(imdbID) {
    console.log("adding movie " + imdbID + " to collection...")
  }

  handleAddClick(e) {
    this.addToCollection(e.target.id)
  }

  render() {
    let extra = [];
     
    if (this.props.extra) {
      this.props.extra.forEach(element => {
          extra.push(this.findObjectByKey(this.props.genres, 'id', element));
      });
    }

    let extraHTML = extra.length > 0 ? <Card.Content extra>
    <a>
      <Icon name='tags' />
      {extra.join(", ")}
    </a>
  </Card.Content> : '';

    let rating = (this.props.rating > 0) ? "Vote average: " +this.props.rating : 'No votes';
    let releaseYear = new Date(this.props.date);
    releaseYear = releaseYear.getFullYear(releaseYear);

    let buttons = '';
    if (this.props.userStore.retrieveUser()) {
      buttons= <Button onClick={this.handleAddClick} id={this.props.id} color="green">+ Add </Button>;
    }

    return (
      <Card>
        <Image src={this.props.image} />
        <Card.Content>
          <Card.Header>
            {this.props.title} 
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {releaseYear} | {rating}
            </span>
          </Card.Meta>
          <Card.Description >
            {this.props.description}
            
          </Card.Description>
        </Card.Content>
        {extraHTML}
        
        {buttons}
      </Card>
    );
  }
}
export default withRouter(inject('userStore')(ListItem));
