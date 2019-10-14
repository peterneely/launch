import React, { Component } from 'react';
import { Tile } from './Tile';
import { getLinks } from '../links';
import './tiles.scss';

export class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = { tiles: [] };
  }

  componentDidMount() {
    getLinks().then(links => {
      this.setState({ tiles: links });
    });
  }

  render() {
    const { tiles } = this.state;
    return (
      <main className="tiles">
        {tiles.map(({ icon, link, name }, index) => (
          <Tile icon={icon} key={index} link={link} name={name} />
        ))}
      </main>
    );
  }
}
