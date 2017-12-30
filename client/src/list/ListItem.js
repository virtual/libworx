import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

export default class ListItem extends Component {
  constructor() {
    super();
    this.findObjectByKey = this.findObjectByKey.bind(this);
  }
   findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === parseInt(value)) {
            return array[i].name;
        }
    }
    return null;
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
      </Card>
    );
  }
}
 