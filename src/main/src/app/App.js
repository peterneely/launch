import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as appActions from './actions';
import { Fade } from './layout/Fade';
import { SettingsButton } from './settings/SettingsButton';
import { SettingsModal } from './settings/SettingsModal';
import { Tiles } from './tiles/Tiles';
import { isValidColor } from './strings';
import { settingsPropType } from './settings/propTypes';
import './app.scss';

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.loadTiles();
  }

  componentDidUpdate(prevProps) {
    this.trySetRootStyle(prevProps);
  }

  handleToggleSettings = () => {
    const { actions } = this.props;
    actions.toggleSettings();
  }

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
    }
  }

  trySetRootStyle = prevProps => {
    const { tilesLoaded, settings } = this.props;
    const { tilesLoaded: prevTilesLoaded, settings: prevSettings } = prevProps;
    const tilesReady = tilesLoaded && !prevTilesLoaded;
    const themeChanged = !isEqual(settings.theme, prevSettings.theme);
    if (tilesReady || themeChanged) {
      this.styles.setRootStyle(settings.theme);
    }
  };

  render() {
    const { tilesLoaded, showSettings } = this.props;
    return (
      <Fade show={tilesLoaded} className="app" style={this.styles.createAppStyle()}>
        <SettingsButton disabled={showSettings} onClick={this.handleToggleSettings} />
        <Tiles disabled={showSettings} />
        {showSettings && <SettingsModal onClose={this.handleToggleSettings} />}
      </Fade>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  tilesLoaded: PropTypes.bool,
  settings: settingsPropType.isRequired
};

const mapStateToProps = state => {
  const { app: { tilesLoaded, settings, showSettings } = {} } = state;
  return { tilesLoaded, settings, showSettings };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
