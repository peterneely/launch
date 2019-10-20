import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';

const TileImages = ({ tiles, onChange }) => (
  <div className="link-configs">
    {tiles.map((tile, index) => {
      const { title, domain, url, image } = tile;
      return (
        <Fragment key={index}>
          <div className="link-config mod-title">{title}</div>
          <div className="link-config mod-domain">{domain}</div>
          <Input className="link-config mod-image" name="image" value={image} onChange={onChange(url)} />
        </Fragment>
      );
    })}
  </div>
);

TileImages.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
  onChange: PropTypes.func.isRequired,
};

export { TileImages };
