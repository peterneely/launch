import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from '../settings/actions';
import { Tile, tilePropType } from './Tile';
import { settingsPropType } from '../settings/propTypes';
import { toClassNames } from '../utils/strings';
import './tiles.scss';

class Tiles extends Component {
  componentDidUpdate() {
    const { disabled } = this.props;
    document.documentElement.classList.toggle('is-disabled', disabled);
  }

  handleEditTile = url => () => {
    const { actions: { settings: { toggleSettings } = {} } = {} } = this.props;
    toggleSettings(url);
  };

  render() {
    const { disabled, settings: { theme } = {}, tiles } = this.props;
    return (
      <main className={toClassNames('tiles', disabled ? 'is-disabled' : null)}>
        {tiles.map((tile, index) => (
          <Tile key={index} onEdit={this.handleEditTile} tile={tile} theme={theme} />
        ))}
      </main>
    );
  }
}

Tiles.propTypes = {
  actions: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  settings: settingsPropType.isRequired,
  tiles: PropTypes.arrayOf(tilePropType),
};

const mapStateToProps = state => {
  const {
    settings: { settings },
    tiles: { tiles },
  } = state;
  return { settings, tiles };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    settings: bindActionCreators(settingsActions, dispatch),
  },
});

const component = connect(mapStateToProps, mapDispatchToProps)(Tiles);

export { component as Tiles };
