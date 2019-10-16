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
    const { disabled, links } = this.props;
    return (
      <main className={toClassNames('tiles', disabled ? 'mod-disabled' : null)}>
        {links.map(({ title, url, icon }, index) => (
          <Tile key={index} title={title} url={url} icon={icon} />
        ))}
      </main>
    );
  }
}

Tiles.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // tile title
      url: PropTypes.string.isRequired, // tile URL to launch
      icon: PropTypes.string.isRequired, // tile icon
    })
  ),
  disabled: PropTypes.bool,
};
