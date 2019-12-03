import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../layout/Checkbox';
import { Input } from '../layout/Input';
import { tilePropType } from '../tiles/propTypes';
import { toClassNames } from '../utils/strings';
import './tabImagesList.scss';

class TabImagesList extends Component {
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

    const createClasses = ({ index, scroll, scrollToUrl }) => {
      const { classesByUrl } = this.state;
      const even = index % 2 === 0;
      return {
        cellInputClasses: toClassNames('cell', 'mod-image', scroll ? classesByUrl[scrollToUrl] : null),
        rowClasses: toClassNames('images-row', even ? 'mod-even' : null, scroll ? classesByUrl[scrollToUrl] : null),
      };
    };

    const delayDeselect = scrollToUrl => {
      deselectTimer = setTimeout(() => {
        destroyDeselectTimer();
        const { classesByUrl: { [scrollToUrl]: urlToRemove, ...restClassesByUrl } = {} } = this.state;
        this.setState({ classesByUrl: restClassesByUrl });
      }, 750);
    };

    const select = ({ rowElement, scrollToUrl }) => {
      const { classesByUrl } = this.state;
      rowElement.scrollIntoView({ block: 'center' });
      this.setState({ classesByUrl: { ...classesByUrl, [scrollToUrl]: 'mod-scroll' } });
      delayDeselect(scrollToUrl);
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
        const { onChange, scrollToUrl } = this.props;
        const { title, url, image } = tile;
        const scroll = url === scrollToUrl;
        const { cellInputClasses, rowClasses } = createClasses({ index, scroll, scrollToUrl });
        return (
          <div className={rowClasses} key={index} ref={setRef(url)}>
            <div className="cell mod-title">
              <span className="cell-text">{title}</span>
              <span className="cell-text mod-subtext truncate-text">{url}</span>
            </div>
            <Input autoFocus={scroll} className={cellInputClasses} name={`tilesByUrl.${url}`} value={image} onChange={onChange(url)} />
          </div>
        );
      },
      tryStopSelect: () => {
        if (deselectTimer) {
          destroyDeselectTimer();
        }
      },
      trySelect: () => {
        const { scrollToUrl } = this.props;
        const rowElement = rowElementsByUrl[scrollToUrl];
        if (rowElement) {
          select({ rowElement, scrollToUrl });
        }
      },
    };
  })();

  render() {
    const { filter, filterEmptyImages, hasEmptyImages, onFilter, onFilterEmptyImages, scrollToUrl, tiles } = this.props;
    const { length: tileCount } = tiles;
    const hasTiles = !!tileCount;
    const bookmarkHeaderLabel = toClassNames('Bookmarks', hasTiles ? `(${tileCount})` : null);
    return (
      <div className="images-list-container">
        {hasTiles || filter ? (
          <Fragment>
            <div className="images-list-filters">
              <Input
                autoFocus={!scrollToUrl}
                className="images-list-filter"
                name="filter"
                onChange={onFilter}
                dirtyOnChange={false}
                placeholder="Filter bookmarks"
                value={filter}
              />
              {hasEmptyImages && (
                <Checkbox
                  checked={filterEmptyImages}
                  label="Show only bookmarks with no image URLs"
                  name="filterEmptyImages"
                  onChange={onFilterEmptyImages}
                />
              )}
            </div>
            <div className="images-list-header">
              <div className="images-row">
                <span className="cell">{bookmarkHeaderLabel}</span>
                <span className="cell has-input">Image URLs</span>
              </div>
            </div>
            <div className="images-list mod-not-empty">{tiles.map(this.row.render)}</div>
          </Fragment>
        ) : (
          <div className="images-list is-empty label mod-sub">No bookmarks :'(</div>
        )}
      </div>
    );
  }
}

TabImagesList.propTypes = {
  filter: PropTypes.string,
  filterEmptyImages: PropTypes.bool,
  hasEmptyImages: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onFilterEmptyImages: PropTypes.func.isRequired,
  scrollToUrl: PropTypes.string,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
};

export { TabImagesList };
