import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LinkConfigs } from './LinkConfigs';
import { getLinkConfigs } from '../links';
import { toClassNames } from '../strings';
import './settings.scss';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { dirty: false, linkConfigs: [], showSettings: false };
  }

  handleBlurModal = () => {
    const { dirty } = this.state;
    if (!dirty) {
      this.handleToggle();
    }
  }

  handleEditImage = () => {
    this.setState({ dirty: true });
  }

  handleSave = () => {
    const { linkConfigs } = this.state;
    const imagesByDomain = linkConfigs.reduce((imagesByDomain, linkImage) => {
      const { domain, image } = linkImage;
      imagesByDomain[domain] = image;
      return imagesByDomain;
    }, {});
    window.chrome.storage.sync.set({ imagesByDomain }, () => {
      window.chrome.storage.sync.get(['imagesByDomain'], results => {
        console.log(results);
      });
    });
  };

  handleToggle = () => {
    const { showSettings: prevShowSettings } = this.state;
    const showSettings = !prevShowSettings;
    this.setState({ showSettings });
    if (showSettings) {
      getLinkConfigs().then(linkConfigs => {
        this.setState({ linkConfigs });
      });
    }
  };

  render() {
    const { children } = this.props;
    const { dirty, linkConfigs, showSettings } = this.state;
    const childProps = {
      settingsButton: (
        <div className="button-toggle-container">
          <i className={toClassNames('button-toggle', 'fas', 'fa-cog', showSettings ? 'mod-disabled' : null)} onClick={this.handleToggle} />
        </div>
      ),
      settingsModal: (
        showSettings && (
          <Fragment>
            <div className="modal">
              <LinkConfigs linkConfigs={linkConfigs} onEditImage={this.handleEditImage} />
              <button className="button-save" onClick={this.handleSave}>Save</button>
            </div>
            <div className={toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null)} onClick={this.handleBlurModal} />
          </Fragment>
        )
      )
    };
    return <Fragment> {children(childProps)} </Fragment>;
  }
}

Settings.propTypes = {
  children: PropTypes.func.isRequired,
};
