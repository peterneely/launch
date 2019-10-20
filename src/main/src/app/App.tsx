import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './actions';
import { Fade } from './layout/Fade';
import { Settings, settingsPropType } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import { isValidColor } from './strings';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { backgroundColor: null }
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadTiles();
  }

  componentDidUpdate(prevProps) {
    const { loaded, settings: { backgroundColor } = {} } = this.props;
    const { settings: { backgroundColor: prevBackgroundColor } = {} } = prevProps;
    if ((loaded && !prevProps.loaded) || backgroundColor !== prevBackgroundColor) {
      this.setBackgroundColor();
    }
  }

  setBackgroundColor = () => {
    const { settings: { backgroundColor } = {} } = this.props;
    if (isValidColor(backgroundColor)) {
      document.documentElement.style.backgroundColor = backgroundColor;
      this.setState({ backgroundColor });
    } else {
      document.documentElement.style.backgroundColor = undefined;
      this.setState({ backgroundColor: null });
    }
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { loaded } = this.props;
    const { backgroundColor } = this.state;
    const style = backgroundColor ? { backgroundColor } : undefined;
    return (
      <Fade show={loaded} className="app" style={style}>
        <Settings>
          {editing => <Tiles backgroundColor={backgroundColor} disabled={editing} />}
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
