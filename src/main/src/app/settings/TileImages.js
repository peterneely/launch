import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { toClassNames } from '../strings';

const createClassNames = ({ name, isEven }) => toClassNames('tile-info', `mod-${name}`, isEven ? 'mod-even' : null);

const TileImages = ({ tiles, onChange }) => (
  <Fragment>
    <label className="label tile-images-label">Image URLs</label>
    <div className="tile-images">
      {tiles.map((tile, index) => {
        const { title, domain, url, image } = tile;
        const isEven = index%2 === 0;
        return (
          <Fragment key={index}>
            <div className={createClassNames({ name: 'title', isEven })}>{title}</div>
            <div className={createClassNames({ name: 'domain', isEven })}>{domain}</div>
            <Input className={createClassNames({ name: 'image', isEven })} name="image" value={image} onChange={onChange(url)} />
          </Fragment>
        );
      })}
    </div>
  </Fragment>
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
