import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import keyBy from 'lodash/keyBy';
import * as appActions from '../actions';
import { Button } from '../layout/Button';
import { Checkbox } from '../layout/Checkbox';
import { Input } from '../layout/Input';
import { ImagesGrid } from './ImagesGrid';
import { ImagesJson } from './ImagesJson';
import { cleanJson, toClassNames } from '../strings';
import { settingsPropType } from './propTypes';
import { tilePropType } from '../tiles/Tile';
import './settingsModal.scss';

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    const { settings: { sorted, theme } = {}, tiles } = props;
    this.state = {
      dirty: false,
      gridFilter: '',
      sorted,
      theme,
      tilesByUrl: keyBy(tiles, 'url'),
    };
  }

  handleBlurModal = event => {
    const { onClose } = this.props;
    const { dirty } = this.state;
    if (!dirty) {
      onClose(event);
    }
  };

  handleChangeGridRow = url => () => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    const tilesByUrl = { ...prevTilesByUrl, [url]: { ...prevTilesByUrl[url], image: event.target.value } };
    this.setState({ dirty: true, tilesByUrl });
  };

  handleChangeJson = event => {
    this.setTilesByUrl({ json: event.target.value});
  };

  handleChangeInput = ({ name }) => event => {
    const { theme: prevTheme } = this.state;
    this.setState({ dirty: true, theme: { ...prevTheme, [name]: event.target.value } });
  };

  handleChangeCheckbox = ({ name, checked }) => () => {
    this.setState({ dirty: true, [name]: !checked });
  };

  handleFilterGridRows = () => event => {
    this.setState({ gridFilter: event.target.value });
  };

  handlePasteInput = event => {
    this.setTilesByUrl({ json: event.clipboardData.getData('text/plain') });
  };

  handleSave = event => {
    const { actions, onClose } = this.props;
    const { sorted, theme } = this.state;
    const { imagesByUrl } = this.parseState();
    const settings = { imagesByUrl, sorted, theme };
    actions.saveSettings(settings);
    onClose(event);
  };

  setTilesByUrl = ({ json }) => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    try {
      const imagesByUrl = JSON.parse(cleanJson(json));
      const tilesByUrl = Object.entries(imagesByUrl).reduce(
        (tilesByUrl, [url, image]) => {
          if (url in tilesByUrl) {
            tilesByUrl[url].image = image;
          }
          return tilesByUrl;
        },
        { ...prevTilesByUrl }
      );
      this.setState({ dirty: true, tilesByUrl });
    } catch (error) {}
  };

  parseState = () => {
    const { tilesByUrl } = this.state;
    const tiles = Object.values(tilesByUrl);
    const imagesByUrl = tiles.reduce((imagesByUrl, tile) => {
      const { url, image } = tile;
      imagesByUrl[url] = image;
      return imagesByUrl;
    }, {});
    return { imagesByUrl, tiles };
  };

  render() {
    const { onClose } = this.props;
    const { dirty, gridFilter, sorted, theme: { backgroundColor } = {} } = this.state;
    const { imagesByUrl, tiles } = this.parseState();
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      <Fragment>
        <div className="modal">
          <div className="modal-header">
            <h1 className="label label-title">Launch Settings</h1>
            <Button className="button-close" icon={<i className="fas fa-times icon-close" />} onClick={onClose} />
          </div>
          <div className="modal-body">
            <div className="settings-group mod-grid">
              <label className="label">Bookmark Images</label>
              <ImagesGrid tiles={tiles} filter={gridFilter} onChangeRow={this.handleChangeGridRow} onFilterRows={this.handleFilterGridRows} />
            </div>
            <div className="settings-group mod-json">
              <label className="label">Bookmark Images JSON</label>
              <ImagesJson imagesByUrl={imagesByUrl} onChange={this.handleChangeJson} onPaste={this.handlePasteInput} />
            </div>
            <div className="settings-group mod-other">
              <Checkbox name="sorted" label="Sorted" checked={sorted} onChange={this.handleChangeCheckbox} />
              <Input name="backgroundColor" label="Background Color" onChange={this.handleChangeInput} value={backgroundColor} />
            </div>
          </div>
          <div className="modal-footer">
            <Button className="button-cancel" label="Cancel" onClick={onClose} />
            <Button className="button-save" label="Save" onClick={this.handleSave} primary disabled={!dirty} />
          </div>
        </div>
        <div className={overlayClasses} onClick={this.handleBlurModal} />
      </Fragment>
    );
  }
}

SettingsModal.propTypes = {
  actions: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
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
)(SettingsModal);

export { component as SettingsModal };
