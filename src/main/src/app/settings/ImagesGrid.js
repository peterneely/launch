import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { toClassNames } from '../strings';

const createCellClasses = ({ name, isEven }) => toClassNames('cell', `mod-${name}`, isEven ? 'mod-even' : null);

const ImagesGrid = ({ tiles, onChange }) => (
  <Fragment>
    <label className="label images-grid-label">Image URLs</label>
    <div className="images-grid">
      {tiles.map((tile, index) => {
        const { title, url, image } = tile;
        const isEven = index % 2 === 0;
        return (
          <Fragment key={index}>
            <div className={createCellClasses({ name: 'title', isEven })}>
              <span className="cell-text truncate-text">{title}</span>
            </div>
            {/* <div className={createCellClasses({ name: 'domain', isEven })}>{domain}</div> */}
            <div className={createCellClasses({ name: 'url', isEven })}>
              <span className="cell-text truncate-text">{url}</span>
            </div>
            <Input className={createCellClasses({ name: 'image', isEven })} name="image" value={image} onChange={onChange(url)} />
          </Fragment>
        );
      })}
    </div>
  </Fragment>
);

ImagesGrid.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired
  ),
  onChange: PropTypes.func.isRequired,
};

export { ImagesGrid };
