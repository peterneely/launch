import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as appActions from './actions';
import * as bookmarkActions from './bookmarks/actions';
import * as settingsActions from './settings/actions';
import * as tileActions from './tiles/actions';
import { Fade } from './layout/Fade';
import { SettingsButton } from './settings/SettingsButton';
import { SettingsModal } from './settings/SettingsModal';
import { Tiles } from './tiles/Tiles';
import { bookmarkPropType, folderPropType } from './bookmarks/propTypes';
import { isValidColor } from './utils/strings';
import { settingsPropType } from './settings/propTypes';
import { tilePropType } from './tiles/propTypes';
import './app.scss';

class App extends Component {
  componentDidMount() {
    const { actions: { settings: { loadSettings } = {} } = {} } = this.props;
    loadSettings();
  }

  componentDidUpdate(prevProps) {
    this.trySetFolder(prevProps);
    this.tryLoadTiles(prevProps);
    this.trySetRootStyle(prevProps);
    this.tryShowSettingsModal(prevProps);
  }

  handleToggleSettings = () => {
    const { actions: { settings: { toggleSettings } = {} } = {} } = this.props;
    toggleSettings();
  };

  styles = {
    createAppStyle: () => {
      const { savedSettings: { theme: { backgroundColor } = {} } = {} } = this.props;
      return isValidColor(backgroundColor) ? { backgroundColor } : undefined;
    },
    setRootStyle: theme => {
      const { backgroundColor } = theme || {};
      const { documentElement: html } = document;
      html.style.backgroundColor = isValidColor(backgroundColor) ? backgroundColor : null;
      html.classList.add('mod-tiles-loaded');
    },
  };

  tryLoadTiles = prevProps => {
    const {
      actions: { app: { setAppReady } = {}, tiles: { loadTiles } = {} } = {},
      appReady,
      bookmarksByFolderId,
      folder: { id: folderId } = {},
      savedSettings,
      tiles,
    } = this.props;
    const { folder: { id: prevFolderId } = {} } = prevProps;
    if (folderId && !prevFolderId && !tiles.length) {
      loadTiles({ bookmarksByFolderId, folderId, savedSettings });
    } else if (!appReady && !prevProps.appReady) {
      setAppReady();
    }
  };

  trySetFolder = prevProps => {
    const { actions: { bookmarks: { setFolder } = {} } = {}, folder: { id: folderId } = {}, savedSettings } = this.props;
    const { folder: { id: settingsFolderId } = {} } = savedSettings;
    const { savedSettings: { folder: { id: prevSettingsFolderId } = {} } = {} } = prevProps;
    if (!folderId && settingsFolderId && !prevSettingsFolderId) {
      setFolder(savedSettings);
    }
  };

  trySetRootStyle = prevProps => {
    const { appReady, savedSettings } = this.props;
    const { appReady: prevAppReady, savedSettings: prevSettings } = prevProps;
    const ready = appReady && !prevAppReady;
    const themeChanged = !isEqual(savedSettings.theme, prevSettings.theme);
    if (ready || themeChanged) {
      this.styles.setRootStyle(savedSettings.theme);
    }
  };

  tryShowSettingsModal = prevProps => {
    const { actions: { settings: { toggleSettings } = {} } = {}, savedSettings, showSettingsDialog } = this.props;
    const { folder: { id: settingsFolderId } = {} } = savedSettings;
    if (!settingsFolderId && !showSettingsDialog && !prevProps.showSettingsDialog) {
      toggleSettings();
    }
  };

  render() {
    const { appReady, showSettingsDialog } = this.props;
    return (
      <Fade show={appReady} className="app" style={this.styles.createAppStyle()}>
        <SettingsButton disabled={showSettingsDialog} onClick={this.handleToggleSettings} />
        <Tiles disabled={showSettingsDialog} />
        {showSettingsDialog && <SettingsModal onClose={this.handleToggleSettings} />}
      </Fade>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  bookmarksByFolderId: PropTypes.objectOf(PropTypes.arrayOf(bookmarkPropType)).isRequired,
  folder: folderPropType.isRequired,
  appReady: PropTypes.bool,
  savedSettings: settingsPropType.isRequired,
  showSettingsDialog: PropTypes.bool,
  tiles: PropTypes.arrayOf(tilePropType).isRequired,
};

const mapStateToProps = state => {
  const {
    app: { appReady },
    bookmarks: { bookmarksByFolderId, folder },
    settings: { savedSettings, showSettingsDialog },
    tiles: { tiles },
  } = state;
  return { appReady, bookmarksByFolderId, folder, savedSettings, showSettingsDialog, tiles };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    app: bindActionCreators(appActions, dispatch),
    bookmarks: bindActionCreators(bookmarkActions, dispatch),
    settings: bindActionCreators(settingsActions, dispatch),
    tiles: bindActionCreators(tileActions, dispatch),
  },
});

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
