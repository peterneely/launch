import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { backgroundColor, tile } = this.props;
    const { hovering } = this.state;
    const { title, url, image } = tile;
    const innerBorderStyle = hovering && backgroundColor ? { backgroundColor } : undefined;
    return (
      <div className="tile" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <div className="tile-border tile-border-outer">
          <div className="tile-border tile-border-inner" style={innerBorderStyle}>
            <a className="tile-link" href={url}>
              <div className="title-image-container">{image && <img className="tile-image" src={image} alt="" />}</div>
              <div className="tile-title">{title}</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export const tilePropType = PropTypes.shape({
  title: PropTypes.string.isRequired, // tile title
  url: PropTypes.string.isRequired, // tile URL to launch
  domain: PropTypes.string.isRequired, // tile URL domain
  image: PropTypes.string, // tile image URL
});

Tile.propTypes = {
  backgroundColor: PropTypes.string,
  tile: tilePropType,
};

export { Tile }
