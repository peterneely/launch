import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { tilePropType } from '../tiles/Tile';
import { toClassNames } from '../strings';
import './imagesList.scss';

class ImagesList extends Component {
  constructor(props) {
    super(props);
    this.rowElementsByUrl = {};
  }

  componentDidMount() {
    const { scrollToUrl } = this.props;
    if (scrollToUrl) {
      const rowElement = this.rowElementsByUrl[scrollToUrl];
      if (rowElement) {
        rowElement.scrollIntoView({ block: 'center' });
      }
    }
  }

  setTileRef = url => ref => {
    this.rowElementsByUrl[url] = ref;
  };

  render() {
    const { filter, onChange, onFilter, scrollToUrl, tiles } = this.props;
    return (
      <div className="images-list-container">
        <Input
          autoFocus={!scrollToUrl}
          className="images-list-filter"
          name="filter"
          placeholder="Filter bookmarks"
          value={filter}
          onChange={onFilter}
        />
        <div className="images-list-header">
          <div className="images-row">
            <span className="cell">Bookmark</span>
            <span className="cell has-input">Image URL</span>
          </div>
        </div>
        <div className="images-list">
          {tiles.map((tile, index) => {
            const { title, url, image } = tile;
            const even = index % 2 === 0;
            const autoScrolled = url === scrollToUrl;
            const rowClasses = toClassNames('images-row', even ? 'mod-even' : null, autoScrolled ? 'mod-auto-scrolled' : null);
            const cellInputClasses = toClassNames('cell', 'mod-image', autoScrolled ? 'mod-auto-scrolled' : null);
            return (
              <div className={rowClasses} key={index} ref={this.setTileRef(url)}>
                <div className="cell mod-title">
                  <span className="cell-text">{title}</span>
                  <span className="cell-text mod-subtext truncate-text">{url}</span>
                </div>
                <Input autoFocus={autoScrolled} className={cellInputClasses} name="image" value={image} onChange={onChange(url)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ImagesList.propTypes = {
  filter: PropTypes.string,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  scrollToUrl: PropTypes.string,
};

export { ImagesList };
