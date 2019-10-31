import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { toClassNames } from '../strings';
import './imagesGrid.scss';

const createCellClasses = ({ name, isEven }) => toClassNames('cell', `mod-${name}`, isEven ? 'mod-even' : null);

const ImagesGrid = ({ filter, tiles, onChangeRow, onFilterRows }) => {
  const matchesFilter = ({ title, url, image }) => [title, url, image].some(searchable => searchable.includes(filter));
  return (
    <div className="images-grid-container">
      <Input name="filter" className="input-filter" onChange={onFilterRows} value={filter} />
      <div className="images-grid">
        {tiles.filter(matchesFilter).map((tile, index) => {
          const { title, url, image } = tile;
          const isEven = index % 2 === 0;
          return (
            <Fragment key={index}>
              <div className={createCellClasses({ name: 'title', isEven })}>
                <span className="cell-text">{title}</span>
                <span className="cell-text mod-subtext truncate-text">{url}</span>
              </div>
              <Input className={createCellClasses({ name: 'image', isEven })} name="image" value={image} onChange={onChangeRow(url)} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

ImagesGrid.propTypes = {
  filter: PropTypes.string,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired
  ),
  onChangeRow: PropTypes.func.isRequired,
  onFilterRows: PropTypes.func.isRequired,
};

export { ImagesGrid };
