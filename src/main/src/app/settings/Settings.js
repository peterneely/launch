import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import keyBy from 'lodash/keyBy';
import * as appActions from '../actions';
import { Button } from '../layout/Button';
import { Checkbox } from '../layout/Checkbox';
import { Input } from '../layout/Input';
import { TileImages } from './TileImages';
import { tilePropType } from '../tiles/Tile';
import { toClassNames } from '../strings';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createInitialState = () => {
    const { settings: { backgroundColor, sorted } = {}, tiles } = this.props;
    const tilesByUrl = keyBy(tiles, 'url');
    return { backgroundColor, dirty: false, editing: false, sorted, tilesByUrl };
  };

  createSavableSettings = () => {
    const { backgroundColor, sorted, tilesByUrl } = this.state;
    return {
      backgroundColor,
      imagesByUrl: Object.values(tilesByUrl).reduce((imagesByUrl, tile) => {
        const { url, image } = tile;
        imagesByUrl[url] = image;
        return imagesByUrl;
      }, {}),
      sorted,
    };
  };

  handleBlurModal = () => {
    const { dirty } = this.state;
    if (!dirty) {
      this.handleToggle();
    }
  };

  handleChangeImage = url => () => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    const tilesByUrl = { ...prevTilesByUrl, [url]: { ...prevTilesByUrl[url], image: event.target.value } };
    this.setState({ dirty: true, tilesByUrl });
  };

  handleChangeInput = ({ name }) => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheckbox = ({ name, checked }) => () => {
    this.setState({ [name]: !checked });
  };

  handleSave = () => {
    const { actions } = this.props;
    const settings = this.createSavableSettings();
    this.handleToggle();
    actions.saveSettings(settings);
  };

  handleToggle = async () => {
    const { editing: prevEditing } = this.state;
    const editing = !prevEditing;
    const state = {
      ...(editing ? this.createInitialState() : {}),
      editing,
    };
    this.setState(state);
  };

  renderSettingsButton = () => {
    const { editing } = this.state;
    const iconClass = toClassNames('button-toggle', 'fas', 'fa-cog', editing ? 'mod-disabled' : null);
    return (
      <div className="button-toggle-container">
        <i className={iconClass} onClick={this.handleToggle} />
      </div>
    );
  };

  renderSettingsModal = () => {
    const { backgroundColor, dirty, sorted, tilesByUrl } = this.state;
    const tiles = Object.values(tilesByUrl);
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      <Fragment>
        <div className="modal">
          <div className="modal-body">
            <TileImages tiles={tiles} onChange={this.handleChangeImage} />
            <Checkbox checked={sorted} name="sorted" onChange={this.handleChangeCheckbox} />
            <Input name="backgroundColor" onChange={this.handleChangeInput} value={backgroundColor} />
          </div>
          <div className="modal-footer">
            <Button className="button-cancel" label="Cancel" onClick={this.handleToggle} />
            <Button className="button-save" label="Save" onClick={this.handleSave} />
          </div>
        </div>
        <div className={overlayClasses} onClick={this.handleBlurModal} />
      </Fragment>
    );
  };

  render() {
    const { children } = this.props;
    const { editing } = this.state;
    return (
      <Fragment>
        {this.renderSettingsButton()}
        {children(editing)}
        {editing && this.renderSettingsModal()}
      </Fragment>
    );
  }
}

export const settingsPropType = PropTypes.shape({
  backgroundColor: PropTypes.string,
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
  sorted: PropTypes.bool
});

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  settings: settingsPropType.isRequired,
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
)(Settings);

export { component as Settings };
