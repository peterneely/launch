import React, { Component } from 'react';
import { Tile } from './Tile';
import { links } from './links';
import './launch.scss';

export class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = { tiles: [] };
  }

  componentDidMount() {
    window.chrome.runtime.sendMessage({ message: 'GET_BOOKMARKS' }, ({ bookmarks } = {}) => {
      if (bookmarks) {
        const tiles = bookmarks.map(({ title, url }) => {
          const { icon } = links.find(({ link }) => link === url) || {};
          return { icon, link: url, name: title };
        })
        this.setState({ tiles });
      }
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
