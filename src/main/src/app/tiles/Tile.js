import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isValidColor } from '../utils/strings';
import { themePropType } from '../settings/propTypes';
import { tilePropType } from './propTypes';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { hovering: false };
  }

  handleMouseOver = () => {
    this.setState({ hovering: true });
  }

  handleMouseOut = () => {
    this.setState({ hovering: false });
  }

  createBorderStyle = () => {
    const { theme: { backgroundColor } = {} } = this.props;
    const { hovering } = this.state;
    return hovering && isValidColor(backgroundColor) ? { backgroundColor } : undefined;
  }

  render() {
    const { onEdit, tile: { title, url, image } = {} } = this.props;
    return (
      <div className="tile" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <div className="tile-border tile-border-outer">
          <div className="tile-border tile-border-inner" style={this.createBorderStyle()}>
            <a className="tile-link" href={url}>
              <div className="title-image-container">{image && <img className="tile-image" src={image} alt="" />}</div>
              <div className="tile-title">{title}</div>
            </a>
            <i className="tile-icon mod-edit fas fa-cog" onClick={onEdit(url)} />
          </div>
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  onEdit: PropTypes.func.isRequired,
  theme: themePropType,
  tile: tilePropType,
};

export { Tile }
