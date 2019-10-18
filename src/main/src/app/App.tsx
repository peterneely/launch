import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './actions';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import './app.scss';

interface IProps {
  actions: object,
  tiles: string[]
}

class App extends Component<IProps> {

  componentDidMount() {
    const { actions } = this.props;
    actions.getTiles();
  }

  componentDidUpdate(prevProps) {
    const { tiles } = this.props;
    if (!prevProps.tiles.length && tiles.length) {
      this.setBackgroundColor();
    }
  }

  setBackgroundColor = () => {
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { tiles } = this.props;
    return (
      <Fade show={!!tiles.length} className="app">
        <Settings>
          {settingsOpen => <Tiles tiles={tiles} disabled={settingsOpen} />}
        </Settings>
      </Fade>
    );
  }
}

const mapStateToProps = state => {
  const { app: { tiles } = {} } = state;
  return { tiles };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
}

const component = connect(mapStateToProps, mapDispatchToProps)(App);

export { component as App };
