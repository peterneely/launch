import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import keyBy from 'lodash/keyBy';
import * as appActions from '../actions';
import { Button } from '../layout/Button';
import { TileImages } from './TileImages';
import { tilePropType } from '../tiles/Tile';
import { toClassNames } from '../strings';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { dirty: false, editing: false, tilesByUrl: {} };
  }

  componentDidMount() {
    const { tiles } = this.props;
    const tilesByUrl = keyBy(tiles, 'url');
    this.setState({ tilesByUrl });
  }

  handleBlurModal = () => {
    const { dirty } = this.state;
    if (!dirty) {
      this.handleToggle();
    }
  };

  handleEdit = url => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    const tilesByUrl = { ...prevTilesByUrl, [url]: { ...prevTilesByUrl[url], image: event.target.value } };
    this.setState({ dirty: true, tilesByUrl });
  };

  handleSave = () => {
    const { actions } = this.props;
    const { tilesByUrl } = this.state;
    const settings = {
      imagesByUrl: Object.values(tilesByUrl).reduce((imagesByUrl, tile) => {
        const { url, image } = tile;
        imagesByUrl[url] = image;
        return imagesByUrl;
      }, {}),
    };
    actions.saveSettings(settings);
  };

  handleToggle = async () => {
    const { dirty: prevDirty, editing: prevEditing } = this.state;
    const editing = !prevEditing;
    this.setState({ editing, dirty: editing && prevDirty });
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
    const { dirty, tilesByUrl } = this.state;
    const tiles = Object.values(tilesByUrl);
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      <Fragment>
        <div className="modal">
          <div className="modal-body">
            <TileImages tiles={tiles} onEdit={this.handleEdit} />
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

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  tiles: PropTypes.arrayOf(tilePropType),
};

const mapStateToProps = state => {
  const { app: { tiles } = {} } = state;
  return { tiles };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export { component as Settings };
