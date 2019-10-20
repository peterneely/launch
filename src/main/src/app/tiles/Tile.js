import React from 'react';
import PropTypes from 'prop-types';

export const Tile = ({ tile }) => {
  const { title, url, image } = tile;
  return (
    <div className="tile">
      <div className="tile-border tile-border-outer">
        <div className="tile-border tile-border-inner">
          <a className="tile-link" href={url}>
            <div className="title-image-container">
              {image && <img className="tile-image" src={image} alt="" />}
            </div>
            <div className="tile-title">{title}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export const tilePropType = PropTypes.shape({
  title: PropTypes.string.isRequired, // tile title
  url: PropTypes.string.isRequired, // tile URL to launch
  domain: PropTypes.string.isRequired, // tile URL domain
  image: PropTypes.string, // tile image URL
});

Tile.propTypes = {
  tile: tilePropType
};
