import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as appActions from './actions';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
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
    const { loaded, settings } = this.props;
    const { loaded: prevLoaded, settings: prevSettings } = prevProps;
    const ready = loaded && !prevLoaded;
    const themeChanged = !isEqual(settings.theme, prevSettings.theme);
    if (ready || themeChanged) {
      this.setRootStyle(settings.theme);
    }
  }

  setRootStyle = theme => {
    const { backgroundColor } = theme || {};
    const { documentElement: html } = document;
    html.style.backgroundColor = isValidColor(backgroundColor) ? backgroundColor : null;
    html.classList.add('mod-loaded');
  };

  createAppStyle = () => {
    const { settings: { theme: { backgroundColor } = {} } = {} } = this.props;
    return isValidColor(backgroundColor) ? { backgroundColor } : undefined;
  };

  render() {
    const { loaded } = this.props;
    return (
      <Fade show={loaded} className="app" style={this.createAppStyle()}>
        <Settings>
          {editing => <Tiles disabled={editing} />}
        </Settings>
      </Fade>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  settings: settingsPropType.isRequired
};

const mapStateToProps = state => {
  const { app: { loaded, settings } = {} } = state;
  return { loaded, settings };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
