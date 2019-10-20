import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './actions';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import './app.scss';

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.loadTiles();
  }

  componentDidUpdate(prevProps) {
    const { loaded } = this.props;
    if (loaded && !prevProps.loaded) {
      this.setBackgroundColor();
    }
  }

  setBackgroundColor = () => {
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { loaded } = this.props;
    return (
      <Fade show={loaded} className="app">
        <Settings>
          {editing => <Tiles disabled={editing} />}
        </Settings>
      </Fade>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  loaded: PropTypes.bool
};

const mapStateToProps = state => {
  const { app: { loaded } = {} } = state;
  return { loaded };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
