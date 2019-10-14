import React from 'react';
import PropTypes from 'prop-types';

export const Tile = ({ icon, link, name }) => {
  return (
    <div className="tile">
      <div className="tile-content-border">
        <div className="tile-content">
          <a className="tile-link" href={link}>
            <div className="title-icon-container">
              {icon && <img className="tile-icon" src={icon} alt="" />}
            </div>
            <div className="tile-name">{name}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

Tile.propTypes = {
  icon: PropTypes.string.isRequired, // URL to icon
  link: PropTypes.string.isRequired, // URL to launch
  name: PropTypes.string.isRequired // name of tile
};
