import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../layout/Input';
import { tilePropType } from '../tiles/Tile';
import { toClassNames } from '../strings';
import './imagesList.scss';

class ImagesList extends Component {
  constructor(props) {
    super(props);
    this.state = { classesByUrl: {} };
  }

  componentDidMount() {
    this.row.trySelect();
  }

  componentWillUnmount() {
    this.row.tryStopSelect();
  }

  row = (() => {
    let deselectTimer = null;
    const rowElementsByUrl = {};

    const createClasses = ({ index, scroll, scrollUrl }) => {
      const { classesByUrl } = this.state;
      const even = index % 2 === 0;
      return {
        cellInputClasses: toClassNames('cell', 'mod-image', scroll ? classesByUrl[scrollUrl] : null),
        rowClasses: toClassNames('images-row', even ? 'mod-even' : null, scroll ? classesByUrl[scrollUrl] : null),
      };
    };

    const delayDeselect = scrollUrl => {
      deselectTimer = setTimeout(() => {
        destroyDeselectTimer();
        const { classesByUrl: { [scrollUrl]: urlToRemove, ...restClassesByUrl } = {} } = this.state;
        this.setState({ classesByUrl: restClassesByUrl });
      }, 1500);
    };

    const select = ({ rowElement, scrollUrl }) => {
      const { classesByUrl } = this.state;
      rowElement.scrollIntoView({ block: 'center' });
      this.setState({ classesByUrl: { ...classesByUrl, [scrollUrl]: 'mod-scroll' } });
      delayDeselect(scrollUrl);
    };

    const setRef = url => ref => {
      rowElementsByUrl[url] = ref;
    };

    const destroyDeselectTimer = () => {
      clearTimeout(deselectTimer);
      deselectTimer = null;
    };

    return {
      render: (tile, index) => {
        const { onChange, scrollUrl } = this.props;
        const { title, url, image } = tile;
        const scroll = url === scrollUrl;
        const { cellInputClasses, rowClasses } = createClasses({ index, scroll, scrollUrl });
        return (
          <div className={rowClasses} key={index} ref={setRef(url)}>
            <div className="cell mod-title">
              <span className="cell-text">{title}</span>
              <span className="cell-text mod-subtext truncate-text">{url}</span>
            </div>
            <Input autoFocus={scroll} className={cellInputClasses} name="image" value={image} onChange={onChange(url)} />
          </div>
        );
      },
      tryStopSelect: () => {
        if (deselectTimer) {
          destroyDeselectTimer();
        }
      },
      trySelect: () => {
        const { scrollUrl } = this.props;
        const rowElement = rowElementsByUrl[scrollUrl];
        if (rowElement) {
          select({ rowElement, scrollUrl });
        }
      },
    };
  })();

  render() {
    const { filter, onFilter, scrollUrl, tiles } = this.props;
    return (
      <div className="images-list-container">
        <Input
          autoFocus={!scrollUrl}
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
        <div className="images-list">{tiles.map(this.row.render)}</div>
      </div>
    );
  }
}

ImagesList.propTypes = {
  filter: PropTypes.string,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  scrollUrl: PropTypes.string,
};

export { ImagesList };
