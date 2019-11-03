import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { tilePropType } from '../tiles/Tile';
import { toClassNames } from '../strings';
import './imagesList.scss';

const ImagesList = ({ filter, onChange, onFilter, tiles }) => (
  <div className="images-list-container">
    <Input autoFocus className="images-list-filter" name="filter" placeholder="Filter bookmarks" value={filter} onChange={onFilter} />
    <div className="images-list">
      {tiles.map((tile, index) => {
        const { title, url, image } = tile;
        const isEven = index % 2 === 0;
        return (
          <div className={toClassNames('images-row', isEven ? 'mod-even' : null)} key={index}>
            <div className="cell mod-title">
              <span className="cell-text">{title}</span>
              <span className="cell-text mod-subtext truncate-text">{url}</span>
            </div>
            <Input className="cell mod-image" name="image" value={image} onChange={onChange(url)} />
          </div>
        );
      })}
    </div>
  </div>
);

ImagesList.propTypes = {
  filter: PropTypes.string,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
  onChange: PropTypes.func.isRequired,
};

export { ImagesList };
