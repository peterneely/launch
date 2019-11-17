import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import keyBy from 'lodash/keyBy';
import * as appActions from '../actions';
import { Button } from '../layout/Button';
import { Checkbox } from '../layout/Checkbox';
import { General } from './General';
import { ImagesJson } from './ImagesJson';
import { ImagesList } from './ImagesList';
import { Input } from '../layout/Input';
import { Tabs } from '../layout/Tabs';
import { cleanJson, toClassNames } from '../strings';
import { folderPropType } from '../folders/propTypes';
import { settingsPropType } from './propTypes';
import { tilePropType } from '../tiles/Tile';
import './settingsModal.scss';

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    const { settings: { sorted, theme } = {}, tiles } = props;
    this.state = {
      dirty: false,
      filter: '',
      filterEmptyImages: false,
      prevEmptyImageTilesByUrl: {},
      sorted,
      theme,
      tilesByUrl: keyBy(cloneDeep(tiles), 'url'),
    };
  }

  createTabConfigs = (tiles, hasTiles) => {
    const { actions: { loadFolders } = {}, folders, scrollUrl } = this.props;
    const { filter, filterEmptyImages, prevEmptyImageTilesByUrl } = this.state;
    const hasEmptyImages = !!tiles.filter(({ image }) => !image).length || !!Object.keys(prevEmptyImageTilesByUrl).length;
    const tabConfigs = [
      {
        renderTitle: () => <label className="label mod-tab">General</label>,
        renderBody: () => <General folders={folders} loadFolders={loadFolders} />,
      },
    ];
    if (hasTiles) {
      const tileTabConfigs = [
        {
          renderTitle: () => <label className="label mod-tab">Bookmark Images</label>,
          renderBody: () => (
            <ImagesList
              filter={filter}
              filterEmptyImages={filterEmptyImages}
              hasEmptyImages={hasEmptyImages}
              tiles={tiles}
              onChange={this.handleChangeListInput}
              onFilter={this.handleChangeListFilter}
              onFilterEmptyImages={this.handleChangeListFilterEmptyImages}
              scrollUrl={scrollUrl}
            />
          ),
        },
        {
          renderTitle: () => <label className="label mod-tab">Bookmark Images JSON</label>,
          renderBody: () => <ImagesJson imagesByUrl={this.getImagesByUrl()} onChange={this.handleChangeJson} />,
        },
      ];
      tabConfigs.push(...tileTabConfigs);
    }
    return tabConfigs;
  };

  getFilteredTiles = () => {
    const { filter, filterEmptyImages, prevEmptyImageTilesByUrl, tilesByUrl } = this.state;
    const tiles = Object.values(tilesByUrl);
    const tilesToFilter = filterEmptyImages ? tiles.filter(({ image, url }) => !image || prevEmptyImageTilesByUrl[url]) : tiles;
    return tilesToFilter.filter(({ title, url, image }) => [title, url, image].some(tileInfo => (tileInfo || '').includes(filter)));
  };

  getImagesByUrl = () => {
    const { tilesByUrl } = this.state;
    return Object.values(tilesByUrl).reduce((imagesByUrl, tile) => {
      const { url, image } = tile;
      imagesByUrl[url] = image;
      return imagesByUrl;
    }, {});
  };

  handleBlurModal = event => {
    const { onClose } = this.props;
    const { dirty } = this.state;
    if (!dirty) {
      onClose(event);
    }
  };

  handleChangeJson = event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    try {
      const imagesByUrl = JSON.parse(cleanJson(event.target.value));
      const tilesByUrl = Object.entries(imagesByUrl).reduce(
        (tilesByUrl, [url, image]) => {
          if (url in tilesByUrl) {
            tilesByUrl[url].image = image;
          }
          return tilesByUrl;
        },
        { ...prevTilesByUrl }
      );
      this.setState({ dirty: true, tilesByUrl });
    } catch (error) {}
  };

  handleChangeListFilter = ({ clear }) => event => {
    this.setState({ filter: clear ? '' : event.target.value });
  };

  handleChangeListFilterEmptyImages = ({ checked: prevChecked }) => () => {
    this.setState({
      filterEmptyImages: !prevChecked,
      prevEmptyImageTilesByUrl: (() => {
        if (!prevChecked) {
          const { tilesByUrl } = this.state;
          const tiles = Object.values(tilesByUrl);
          const prevEmptyImageTiles = tiles.filter(({ image }) => !image);
          return keyBy(prevEmptyImageTiles, 'url');
        }
        return {};
      })(),
    });
  };

  handleChangeListInput = url => ({ clear }) => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    const tilesByUrl = { ...prevTilesByUrl, [url]: { ...prevTilesByUrl[url], image: clear ? '' : event.target.value } };
    this.setState({ dirty: true, tilesByUrl });
  };

  handleChangeOtherCheckbox = ({ name, checked }) => () => {
    this.setState({ dirty: true, [name]: !checked });
  };

  handleChangeOtherInput = ({ name }) => event => {
    const { theme: prevTheme } = this.state;
    this.setState({ dirty: true, theme: { ...prevTheme, [name]: event.target.value } });
  };

  handleSave = event => {
    const { actions: { saveSettings } = {}, onClose } = this.props;
    const { sorted, theme } = this.state;
    const imagesByUrl = this.getImagesByUrl();
    saveSettings({ imagesByUrl, sorted, theme });
    onClose(event);
  };

  render() {
    const { onClose } = this.props;
    const { dirty, filter, sorted, theme: { backgroundColor } = {} } = this.state;
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    const tiles = this.getFilteredTiles();
    const hasTiles = !!tiles.length || filter;
    return (
      <Fragment>
        <div className="modal">
          <div>
            <div className="modal-header">
              <h1 className="label label-title">Launch Settings</h1>
              <Button className="button-close" icon={<i className="fas fa-times icon-close" />} onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="settings-group mod-tabs">
                <Tabs tabConfigs={this.createTabConfigs(tiles, hasTiles)} />
              </div>
              <div className="settings-group mod-other">
                {hasTiles ? <Checkbox name="sorted" label="Sorted" checked={sorted} onChange={this.handleChangeOtherCheckbox} /> : null}
                <Input name="backgroundColor" label="Background Color" onChange={this.handleChangeOtherInput} value={backgroundColor} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button className="button-cancel" label="Cancel" onClick={onClose} />
            <Button className="button-save" label="Save" onClick={this.handleSave} primary disabled={!dirty} />
          </div>
        </div>
        <div className={overlayClasses} onClick={this.handleBlurModal} />
      </Fragment>
    );
  }
}

SettingsModal.propTypes = {
  actions: PropTypes.object.isRequired,
  folders: PropTypes.arrayOf(folderPropType).isRequired,
  onClose: PropTypes.func.isRequired,
  scrollUrl: PropTypes.string,
  settings: settingsPropType.isRequired,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
};

const mapStateToProps = state => {
  const { app: { folders, settings, scrollUrl, tiles } = {} } = state;
  return { folders, settings, scrollUrl, tiles };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
};

const component = connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

export { component as SettingsModal };
