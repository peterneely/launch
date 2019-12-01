import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as appActions from './actions';
import * as settingsActions from './settings/actions';
import { Fade } from './layout/Fade';
import { SettingsButton } from './settings/SettingsButton';
import { SettingsModal } from './settings/SettingsModal';
import { Tiles } from './tiles/Tiles';
import { isValidColor } from './utils/strings';
import { settingsPropType } from './settings/propTypes';
import { bookmarkPropType, folderPropType } from './bookmarks/propTypes';
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
      const { settings: { theme: { backgroundColor } = {} } = {} } = this.props;
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
    const { actions: { app: { loadTiles, setAppReady } = {} } = {}, appReady, bookmarksByFolderId, folder, settings, tiles } = this.props;
    if (folder.id && !prevProps.folder.id && !tiles.length) {
      loadTiles({ bookmarksByFolderId, settings });
    } else if (!appReady && !prevProps.appReady) {
      setAppReady();
    }
  };

  trySetFolder = prevProps => {
    const { actions: { app: { setFolder } = {} } = {}, folder, settings } = this.props;
    const { folder: { id: settingsFolderId } = {} } = settings;
    const { settings: { folder: { id: prevSettingsFolderId } = {} } = {} } = prevProps;
    if (!folder.id && settingsFolderId && !prevSettingsFolderId) {
      setFolder(settings);
    }
  };

  trySetRootStyle = prevProps => {
    const { appReady, settings } = this.props;
    const { appReady: prevAppReady, settings: prevSettings } = prevProps;
    const ready = appReady && !prevAppReady;
    const themeChanged = !isEqual(settings.theme, prevSettings.theme);
    if (ready || themeChanged) {
      this.styles.setRootStyle(settings.theme);
    }
  };

  tryShowSettingsModal = prevProps => {
    const { actions: { settings: { toggleSettings } = {} } = {}, settings, showSettings } = this.props;
    const { folder: { id: settingsFolderId } = {} } = settings;
    if (!settingsFolderId && !showSettings && !prevProps.showSettings) {
      toggleSettings();
    }
  };

  render() {
    const { appReady, showSettings } = this.props;
    return (
      <Fade show={appReady} className="app" style={this.styles.createAppStyle()}>
        <SettingsButton disabled={showSettings} onClick={this.handleToggleSettings} />
        <Tiles disabled={showSettings} />
        {showSettings && <SettingsModal onClose={this.handleToggleSettings} />}
      </Fade>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  bookmarksByFolderId: PropTypes.objectOf(bookmarkPropType).isRequired,
  folder: folderPropType.isRequired,
  appReady: PropTypes.bool,
  settings: settingsPropType.isRequired,
  showSettings: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    app: { appReady },
    bookmarks: { bookmarksByFolderId, folder },
    settings: { settings, showSettings },
  } = state;
  return { bookmarksByFolderId, folder, settings, showSettings, appReady };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    app: bindActionCreators(appActions, dispatch),
    settings: bindActionCreators(settingsActions, dispatch),
  },
});

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
