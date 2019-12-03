import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import keyBy from 'lodash/keyBy';
import * as bookmarkActions from '../bookmarks/actions';
import * as settingsActions from './actions';
import { Checkbox } from '../layout/Checkbox';
import { TabGeneral } from './TabGeneral';
import { TabImagesJson } from './TabImagesJson';
import { TabImagesList } from './TabImagesList';
import { Input } from '../layout/Input';
import { Modal } from '../layout/Modal';
import { Tabs } from '../layout/Tabs';
import { cleanJson, toClassNames } from '../utils/strings';
import { folderPropType } from '../bookmarks/propTypes';
import { settingsPropType } from './propTypes';
import { tilePropType } from '../tiles/propTypes';
import './settingsDialog.scss';

class SettingsDialog extends Component {
  constructor(props) {
    super(props);
    const { savedSettings: { folder, sorted, theme } = {}, tilesByFolderId } = props;
    const tiles = tilesByFolderId[folder.id] || [];
    this.state = {
      dirty: false,
      filter: null,
      filterEmptyImages: false,
      folder,
      prevFolder: folder,
      prevEmptyImageTilesByUrl: {},
      sorted,
      theme,
      tilesByUrl: keyBy(cloneDeep(tiles), 'url'),
    };
  }

  createTabConfigs = (tiles, hasTiles) => {
    const { actions: { bookmarks: { loadFolders } = {} } = {}, foldersById, scrollToUrl } = this.props;
    const { filter, filterEmptyImages, folder, prevFolder, prevEmptyImageTilesByUrl } = this.state;
    const hasEmptyImages = !!tiles.filter(({ image }) => !image).length || !!Object.keys(prevEmptyImageTilesByUrl).length;
    const tabConfigs = [
      {
        renderTitle: () => <label className="label mod-tab">General</label>,
        renderBody: () => <TabGeneral folder={folder} foldersById={foldersById} loadFolders={loadFolders} onChange={this.handleChangeInput} />,
      },
    ];
    if (hasTiles) {
      const disabled = folder.id !== prevFolder.id;
      const titleClassName = toClassNames('label', 'mod-tab', disabled ? 'is-disabled' : null);
      const tileTabConfigs = [
        {
          disabled,
          renderTitle: () => <label className={titleClassName}>Bookmark Images</label>,
          renderBody: () => (
            <TabImagesList
              filter={filter}
              filterEmptyImages={filterEmptyImages}
              hasEmptyImages={hasEmptyImages}
              tiles={tiles}
              onChange={this.handleChangeImage}
              onFilter={this.handleChangeInput}
              onFilterEmptyImages={this.handleChangeListFilterEmptyImages}
              scrollToUrl={scrollToUrl}
            />
          ),
        },
        {
          disabled,
          renderTitle: () => <label className={titleClassName}>Bookmark Images JSON</label>,
          renderBody: () => <TabImagesJson imagesByUrl={this.getImagesByUrl()} onChange={this.handleChangeJson} />,
        },
      ];
      tabConfigs.unshift(...tileTabConfigs);
    }
    return tabConfigs;
  };

  getFilteredTiles = () => {
    const { filter, filterEmptyImages, prevEmptyImageTilesByUrl, tilesByUrl } = this.state;
    const tiles = Object.values(tilesByUrl);
    const tilesToFilter = filterEmptyImages ? tiles.filter(({ image, url }) => !image || prevEmptyImageTilesByUrl[url]) : tiles;
    return tilesToFilter.filter(({ title, url, image }) => [title, url, image].some(tileInfo => (tileInfo || '').includes(filter || '')));
  };

  getImagesByUrl = () => {
    const { tilesByUrl } = this.state;
    return Object.values(tilesByUrl).reduce((imagesByUrl, tile) => {
      const { url, image } = tile;
      imagesByUrl[url] = image;
      return imagesByUrl;
    }, {});
  };

  handleChangeImage = url => ({ clear }) => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    this.setState({
      dirty: true,
      tilesByUrl: {
        ...prevTilesByUrl,
        [url]: {
          ...prevTilesByUrl[url],
          image: clear ? '' : event.target.value,
        },
      },
    });
  };

  handleChangeInput = ({ name, prevValue, value, defaultValue = null, clear, toggle, dirty = true }) => event => {
    // console.log({ name, prevValue, value, defaultValue, clear, toggle, dirty });
    this.setState({ dirty, [name]: toggle ? !prevValue : clear ? defaultValue : value || event.target.value });
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

  handleChangeListFilterEmptyImages = ({ prevValue: prevChecked }) => () => {
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

  handleChangeTheme = ({ name }) => event => {
    const { theme: prevTheme } = this.state;
    this.setState({ dirty: true, theme: { ...prevTheme, [name]: event.target.value } });
  };

  handleSave = () => {
    const { actions: { settings: { saveSettings } = {} } = {} } = this.props;
    const { folder, sorted, theme } = this.state;
    const imagesByUrl = this.getImagesByUrl();
    saveSettings({ folder, imagesByUrl, sorted, theme });
  };

  handleToggleSettings = () => {
    const { actions: { settings: { toggleSettings } = {} } = {} } = this.props;
    toggleSettings();
  };

  renderBody = () => {
    const { filter, sorted, theme: { backgroundColor } = {} } = this.state;
    const tiles = this.getFilteredTiles();
    const hasTiles = !!tiles.length || !!filter;
    return (
      <Fragment>
        <div className="settings-body-section mod-tabs">
          <Tabs tabConfigs={this.createTabConfigs(tiles, hasTiles)} />
        </div>
        <div className="settings-body-section mod-other">
          {hasTiles ? <Checkbox name="sorted" label="Sorted" checked={sorted} onChange={this.handleChangeInput} /> : null}
          <Input name="backgroundColor" label="Background Color" onChange={this.handleChangeTheme} value={backgroundColor} />
        </div>
      </Fragment>
    );
  };

  render() {
    const { dirty } = this.state;
    return (
      <Modal
        body={this.renderBody()}
        dirty={dirty}
        onClose={this.handleToggleSettings}
        onSubmit={this.handleSave}
        title="Launch Settings"
      />
    );
  }
}

SettingsDialog.propTypes = {
  actions: PropTypes.object.isRequired,
  foldersById: PropTypes.objectOf(PropTypes.arrayOf(folderPropType)).isRequired,
  savedSettings: settingsPropType.isRequired,
  scrollToUrl: PropTypes.string,
  tilesByFolderId: PropTypes.objectOf(PropTypes.arrayOf(tilePropType)).isRequired,
};

const mapStateToProps = state => {
  const {
    bookmarks: { foldersById },
    settings: { savedSettings, scrollToUrl },
    tiles: { tilesByFolderId },
  } = state;
  return { foldersById, savedSettings, scrollToUrl, tilesByFolderId };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    bookmarks: bindActionCreators(bookmarkActions, dispatch),
    settings: bindActionCreators(settingsActions, dispatch),
  },
});

const component = connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);

export { component as SettingsDialog };
