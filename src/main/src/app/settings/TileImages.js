import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TileImages = ({ tiles, onEdit }) => {
  return (
    <div className="link-configs">
      {tiles.map((tile, index) => {
        const { title, domain, url, image } = tile;
        return (
          <Fragment key={index}>
            <div className="link-config mod-title">{title}</div>
            <div className="link-config mod-domain">{domain}</div>
            <input
              className="link-config mod-image"
              type="text"
              value={image}
              onChange={onEdit(url)}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

TileImages.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
  onEdit: PropTypes.func.isRequired,
};

export { TileImages };
