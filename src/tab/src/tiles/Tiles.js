import React, { Component } from 'react';
import { Tile } from './Tile';
import { getLinks } from '../links';
import { toClassNames } from '../strings';
import './tiles.scss';

export class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  componentDidMount() {
    getLinks().then(links => {
      this.setBackgroundColor();
      this.setState({ links });
    });
  }

  setBackgroundColor = () => {
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { links } = this.state;
    return (
      <main className={toClassNames('tiles', links.length ? 'mod-loaded' : null)}>
        {links.map(({ title, url, icon }, index) => (
          <Tile key={index} title={title} url={url} icon={icon} />
        ))}
      </main>
    );
  }
}
