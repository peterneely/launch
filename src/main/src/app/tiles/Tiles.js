import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tile } from './Tile';
import { toClassNames } from '../strings';
import './tiles.scss';

export class Tiles extends Component {
  componentDidUpdate() {
    const { disabled } = this.props;
    document.documentElement.classList.toggle('mod-disabled', disabled);
  }

  render() {
    const { disabled, tiles } = this.props;
    return (
      <main className={toClassNames('tiles', disabled ? 'mod-disabled' : null)}>
        {tiles.map(({ title, url, image }, index) => (
          <Tile key={index} title={title} url={url} image={image} />
        ))}
      </main>
    );
  }
}

Tiles.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // tile title
      url: PropTypes.string.isRequired, // tile URL to launch
      image: PropTypes.string.isRequired, // tile image
    })
  ),
  disabled: PropTypes.bool,
};
