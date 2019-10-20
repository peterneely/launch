import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions';
import { Tile, tilePropType } from './Tile';
import { toClassNames } from '../strings';
import './tiles.scss';

class Tiles extends Component {
  componentDidUpdate() {
    const { disabled } = this.props;
    document.documentElement.classList.toggle('mod-disabled', disabled);
  }

  render() {
    const { disabled, backgroundColor, tiles } = this.props;
    return (
      <main className={toClassNames('tiles', disabled ? 'mod-disabled' : null)}>
        {tiles.map((tile, index) => (
          <Tile key={index} tile={tile} backgroundColor={backgroundColor} />
        ))}
      </main>
    );
  }
}

Tiles.propTypes = {
  actions: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  tiles: PropTypes.arrayOf(tilePropType),
};

const mapStateToProps = state => {
  const { app: { settings, tiles } = {} } = state;
  return { settings, tiles };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tiles);

export { component as Tiles };
