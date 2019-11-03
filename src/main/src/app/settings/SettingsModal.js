import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import keyBy from 'lodash/keyBy';
import * as appActions from '../actions';
import { Button } from '../layout/Button';
import { Checkbox } from '../layout/Checkbox';
import { ImagesJson } from './ImagesJson';
import { ImagesList } from './ImagesList';
import { Input } from '../layout/Input';
import { Tabs } from '../layout/Tabs';
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
      filter: '',
      sorted,
      theme,
      tilesByUrl: keyBy(tiles, 'url'),
    };
  }

  createTabConfigs = () => {
    const { settingsUrl } = this.props;
    const { filter } = this.state;
    return [
      {
        renderTitle: () => <label className="label mod-tab">Bookmark Images</label>,
        renderBody: () => (
          <ImagesList
            filter={filter}
            tiles={this.getFilteredTiles()}
            onChange={this.handleChangeListInput}
            onFilter={this.handleChangeListFilter}
            scrollToUrl={settingsUrl}
          />
        ),
      },
      {
        renderTitle: () => <label className="label mod-tab">Bookmark Images JSON</label>,
        renderBody: () => (
          <ImagesJson imagesByUrl={this.getImagesByUrl()} onChange={this.handleChangeJson} onPaste={this.handlePasteJson} />
        ),
      },
    ];
  };

  getFilteredTiles = () => {
    const { filter, tilesByUrl } = this.state;
    return Object.values(tilesByUrl).filter(({ title, url, image }) =>
      [title, url, image].some(tileInfo => (tileInfo || '').includes(filter))
    );
  };

  getImagesByUrl = () => {
    const { tilesByUrl } = this.state;
    return Object.values(tilesByUrl).reduce((imagesByUrl, tile) => {
      const { url, image } = tile;
      imagesByUrl[url] = image;
      return imagesByUrl;
    }, {});
  };

  handleBlurModal = event => {
    const { onClose } = this.props;
    const { dirty } = this.state;
    if (!dirty) {
      onClose(event);
    }
  };

  handleChangeJson = event => {
    this.parseJson({ json: event.target.value });
  };

  handleChangeListFilter = ({ clear }) => event => {
    this.setState({ filter: clear ? '' : event.target.value });
  };

  handleChangeListInput = url => ({ clear }) => event => {
    const { tilesByUrl: prevTilesByUrl } = this.state;
    const tilesByUrl = { ...prevTilesByUrl, [url]: { ...prevTilesByUrl[url], image: clear ? '' : event.target.value } };
    this.setState({ dirty: true, tilesByUrl });
  };

  handleChangeOtherCheckbox = ({ name, checked }) => () => {
    this.setState({ dirty: true, [name]: !checked });
  };

  handleChangeOtherInput = ({ name }) => event => {
    const { theme: prevTheme } = this.state;
    this.setState({ dirty: true, theme: { ...prevTheme, [name]: event.target.value } });
  };

  handlePasteJson = event => {
    this.parseJson({ json: event.clipboardData.getData('text/plain') });
  };

  handleSave = event => {
    const { actions, onClose } = this.props;
    const { sorted, theme } = this.state;
    const imagesByUrl = this.getImagesByUrl();
    actions.saveSettings({ imagesByUrl, sorted, theme });
    onClose(event);
  };

  parseJson = ({ json }) => {
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

  render() {
    const { onClose } = this.props;
    const { dirty, sorted, theme: { backgroundColor } = {} } = this.state;
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      <Fragment>
        <div className="modal">
          <div>
            <div className="modal-header">
              <h1 className="label label-title">Launch Settings</h1>
              <Button className="button-close" icon={<i className="fas fa-times icon-close" />} onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="settings-group mod-tabs">
                <Tabs tabConfigs={this.createTabConfigs()} />
              </div>
              <div className="settings-group mod-other">
                <Checkbox name="sorted" label="Sorted" checked={sorted} onChange={this.handleChangeOtherCheckbox} />
                <Input name="backgroundColor" label="Background Color" onChange={this.handleChangeOtherInput} value={backgroundColor} />
              </div>
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
  settingsUrl: PropTypes.string, // URL to scroll to in settings images list
  tiles: PropTypes.arrayOf(tilePropType),
};

const mapStateToProps = state => {
  const { app: { settings, settingsUrl, tiles } = {} } = state;
  return { settings, settingsUrl, tiles };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(appActions, dispatch) };
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);

export { component as SettingsModal };
